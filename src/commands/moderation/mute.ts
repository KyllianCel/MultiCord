import {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder,
    ChatInputCommandInteraction,
    GuildMember
} from 'discord.js'

import { prisma } from '../../index.js'

export default {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Mettre un membre en sourdine (Timeout)')
        .addUserOption((option) =>
            option
                .setName('cible')
                .setDescription('Le membre à mute')
                .setRequired(true)
        )
        .addIntegerOption((option) =>
            option
                .setName('duree')
                .setDescription('Durée du mute en minutes')
                .setRequired(true)
                .addChoices(
                    { name: '60 secondes', value: 1 },
                    { name: '5 minutes', value: 5 },
                    { name: '10 minutes', value: 10 },
                    { name: '1 heure', value: 60 },
                    { name: '1 jour', value: 1440 },
                    { name: '1 semaine', value: 10080 }
                )
        )
        .addStringOption((option) =>
            option.setName('raison').setDescription('Raison du mute')
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

    async execute(interaction: ChatInputCommandInteraction) {
        const target = interaction.options.getMember('cible') as GuildMember
        const duration = interaction.options.getInteger('duree')!
        const reason =
            interaction.options.getString('raison') ?? 'Aucune raison fournie'

        if (!target)
            return interaction.reply({
                content: 'Utilisateur introuvable.',
                ephemeral: true
            })
        if (!target.moderatable)
            return interaction.reply({
                content: 'Je ne peux pas mute ce membre.',
                ephemeral: true
            })

        // Conversion des minutes en millisecondes
        const msDuration = duration * 60 * 1000

        // Application du timeout
        await target.timeout(msDuration, reason)

        // Création de l'Embed
        const embed = new EmbedBuilder()
            .setColor(0x707070)
            .setTitle('🔇 Membre mis en sourdine')
            .addFields(
                {
                    name: 'Utilisateur',
                    value: `${target.user.tag}`,
                    inline: true
                },
                { name: 'Durée', value: `${duration} minute(s)`, inline: true },
                { name: 'Raison', value: reason }
            )
            .setTimestamp()

        // ENVOI DES LOGS
        const config = await prisma.guildConfig.findUnique({
            where: { guildId: interaction.guildId! }
        })

        if (config?.logChannelId) {
            const logChannel = interaction.guild?.channels.cache.get(
                config.logChannelId
            )
            if (logChannel?.isTextBased()) {
                await logChannel.send({ embeds: [embed] })
            }
        }

        return interaction.reply({ embeds: [embed] })
    }
}
