import {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder,
    ChatInputCommandInteraction,
    AutocompleteInteraction
} from 'discord.js'
import prisma from '../../database.js'

export default {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Débannir un membre du serveur')
        .addStringOption((option) =>
            option
                .setName('cible')
                .setDescription('Recherchez l\'utilisateur banni par nom ou ID')
                .setRequired(true)
                .setAutocomplete(true) 
        )
        .addStringOption((option) =>
            option.setName('raison').setDescription('La raison du débannissement')
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    async autocomplete(interaction: AutocompleteInteraction) {
        if (!interaction.guild) return;

        const focusedValue = interaction.options.getFocused();

        try {
            // On récupère la liste des bannis du serveur
            const bans = await interaction.guild.bans.fetch();
            
            // On filtre la liste selon ce que tu tapes
            const filtered = bans.filter(ban => 
                ban.user.tag.toLowerCase().includes(focusedValue.toLowerCase()) ||
                ban.user.id.includes(focusedValue)
            );

            // On renvoie les 25 premiers résultats à Discord
            return interaction.respond(
                filtered.map(ban => ({
                    name: `${ban.user.tag} (${ban.user.id})`.slice(0, 100),
                    value: ban.user.id
                })).slice(0, 25)
            );
        } catch (error) {
            console.error("Erreur lors de la récupération des bans:", error);
            return interaction.respond([]);
        }
    },

    async execute(interaction: ChatInputCommandInteraction) {
        const userId = interaction.options.getString('cible', true);
        const reason = interaction.options.getString('raison') ?? 'Aucune raison fournie';

        if (!interaction.guild) return;
        await interaction.deferReply();

        try {
            // On récupère l'utilisateur banni avant de le unban 
            const banInfo = await interaction.guild.bans.fetch(userId);
            const target = banInfo.user;

            // Exécution du débannissement
            await interaction.guild.members.unban(userId, reason);

            // Tentative de DM
            try {
                await target.send(`✅ Tu as été débanni de **${interaction.guild.name}**.\n**Raison :** ${reason}`);
            } catch {
                console.log(`Impossible de DM ${target.tag}`);
            }

            const embed = new EmbedBuilder()
                .setColor(0x00ff00)
                .setTitle('🔓 Membre débanni')
                .addFields(
                    { name: 'Utilisateur', value: `${target.tag}`, inline: true },
                    { name: 'Modérateur', value: `${interaction.user.tag}`, inline: true },
                    { name: 'Raison', value: reason }
                )
                .setTimestamp();

            // Logs
            const config = await prisma.guildConfig.findUnique({
                where: { guildId: interaction.guildId! }
            });

            if (config?.logChannelId) {
                const logChannel = interaction.guild?.channels.cache.get(config.logChannelId);
                if (logChannel?.isTextBased()) {
                    await logChannel.send({ embeds: [embed] });
                }
            }

            return interaction.editReply({ embeds: [embed] });

        } catch (error: any) {
            console.error(error);
            return interaction.editReply("❌ Impossible de débannir cet utilisateur. Vérifiez qu'il est bien dans la liste des bannis.");
        }
    }
}