import {
    SlashCommandBuilder,
    EmbedBuilder,
    ChatInputCommandInteraction,
    PermissionFlagsBits,
    GuildMember
} from 'discord.js'
import prisma from '../../database.js'

export default {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription(
            "Affiche les informations d'un membre et ses statistiques"
        )
        .addUserOption((option) =>
            option
                .setName('cible')
                .setDescription('Le membre à inspecter')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

    async execute(interaction: ChatInputCommandInteraction) {
        const target = interaction.options.getMember('cible') as GuildMember
        const guildId = interaction.guildId!

        // On compte combien de fois l'ID de l'utilisateur apparaît dans la table Warn
        const warnCount = await prisma.warn.count({
            where: {
                userId: target.id,
                guildId: guildId
            }
        })

        const embed = new EmbedBuilder()
            .setColor(target.displayHexColor || 0x3498db)
            .setTitle(`Profil de ${target.user.tag}`)
            .setThumbnail(target.user.displayAvatarURL())
            .addFields(
                { name: '🆔 ID', value: `\`${target.id}\``, inline: true },
                {
                    name: '⚠️ Avertissements',
                    value: `**${warnCount}** warn(s)`,
                    inline: true
                },
                {
                    name: '📅 Arrivée',
                    value: `<t:${Math.floor(target.joinedTimestamp! / 1000)}:R>`,
                    inline: false
                }
            )
            .setFooter({ text: `Demandé par ${interaction.user.tag}` })
            .setTimestamp()

        return interaction.reply({ embeds: [embed] })
    }
}
