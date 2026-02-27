import {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder,
    ChatInputCommandInteraction,
    GuildMember
} from 'discord.js'

export default {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Expulser un membre du serveur')
        .addUserOption((option) =>
            option
                .setName('cible')
                .setDescription('Le membre à expulser')
                .setRequired(true)
        )
        .addStringOption((option) =>
            option.setName('raison').setDescription("La raison de l'expulsion")
        )
        // Ici on utilise KickMembers au lieu de BanMembers
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

    async execute(interaction: ChatInputCommandInteraction) {
        const target = interaction.options.getMember('cible') as GuildMember
        const reason =
            interaction.options.getString('raison') ?? 'Aucune raison fournie'

        if (!target) {
            return interaction.reply({
                content: 'Utilisateur introuvable.',
                ephemeral: true
            })
        }

        // Vérification si le bot peut kick (hiérarchie des rôles)
        if (!target.kickable) {
            return interaction.reply({
                content:
                    'Je ne peux pas expulser ce membre. Vérifiez que mon rôle est situé au-dessus du sien.',
                ephemeral: true
            })
        }

        // Optionnel : Envoyer un message privé à l'utilisateur avant le kick
        try {
            await target.send(
                `Tu as été expulsé de **${interaction.guild?.name}** pour la raison suivante : ${reason}`
            )
        } catch {
            console.log("Impossible d'envoyer un DM à l'utilisateur.")
        }

        // L'action réelle
        await target.kick(reason)

        // Création de l'Embed
        const embed = new EmbedBuilder()
            .setColor(0xffa500)
            .setTitle('👢 Membre expulsé')
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

        // ENVOI DES LOGS
        const logChannelId = process.env.LOG_CHANNEL_ID
        if (logChannelId) {
            const logChannel =
                interaction.guild?.channels.cache.get(logChannelId)
            if (logChannel?.isTextBased()) {
                await logChannel.send({ embeds: [embed] })
            }
        }

        return interaction.reply({ embeds: [embed] })
    }
}
