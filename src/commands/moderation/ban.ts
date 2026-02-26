import {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder,
    ChatInputCommandInteraction,
    GuildMember
} from 'discord.js'

export default {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bannir un membre du serveur')
        .addUserOption((option) =>
            option
                .setName('cible')
                .setDescription('Le membre à bannir')
                .setRequired(true)
        )
        .addStringOption((option) =>
            option.setName('raison').setDescription('La raison du bannissement')
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    async execute(interaction: ChatInputCommandInteraction) {
        const target = interaction.options.getMember('cible') as GuildMember
        const reason =
            interaction.options.getString('raison') ?? 'Aucune raison fournie'

        // 1. Vérifications de base
        if (!target) {
            return interaction.reply({
                content: 'Utilisateur introuvable sur ce serveur.',
                ephemeral: true
            })
        }

        if (!target.bannable) {
            return interaction.reply({
                content:
                    'Je ne peux pas bannir ce membre. Mon rôle est probablement trop bas.',
                ephemeral: true
            })
        }

        // 2. Envoi du message privé (DM) avant le bannissement
        try {
            await target.send(
                `⚠️ Tu as été banni du serveur **${interaction.guild?.name}**.\n**Raison :** ${reason}`
            )
        } catch {
            // Si les DMs sont fermés, on log l'erreur en console mais on continue
            console.log(`Impossible d'envoyer un DM à ${target.user.tag}.`)
        }

        // 3. Exécution du bannissement
        await target.ban({ reason })

        // 4. Réponse publique (sous forme d'Embed)
        const embed = new EmbedBuilder()
            .setColor(0xff0000)
            .setTitle('🔨 Membre banni')
            .addFields(
                {
                    name: 'Utilisateur',
                    value: `${target.user.tag}`,
                    inline: true
                },
                {
                    name: 'Modérateur',
                    value: `${interaction.user.tag}`,
                    inline: true
                },
                { name: 'Raison', value: reason }
            )
            .setTimestamp()

        return interaction.reply({ embeds: [embed] })
    }
}
