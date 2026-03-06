import {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder,
    ChatInputCommandInteraction,
    AutocompleteInteraction
} from 'discord.js'
import { prisma } from '../../database.js'

export default {
    data: new SlashCommandBuilder()
        .setName('delwarn')
        .setDescription('Supprimer un avertissement spécifique')
        .addUserOption((option) =>
            option
                .setName('cible')
                .setDescription('Le membre dont vous voulez supprimer un warn')
                .setRequired(true)
        )
        .addIntegerOption((option) =>
            option
                .setName('id')
                .setDescription(
                    "Sélectionnez l'avertissement (tapez pour chercher)"
                )
                .setAutocomplete(true)
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

    /**
     * Gestionnaire d'Autocomplete : Propose les warns en temps réel
     */
    async autocomplete(interaction: AutocompleteInteraction) {
        // On récupère l'ID de la cible sélectionnée dans la première option
        const targetId = interaction.options.get('cible')?.value as string

        // Si aucune cible n'est sélectionnée, on ne propose rien
        if (!targetId) return interaction.respond([])

        try {
            // On cherche les 25 derniers avertissements de cet utilisateur
            const warns = await prisma.warn.findMany({
                where: {
                    userId: targetId,
                    guildId: interaction.guildId!
                },
                take: 25,
                orderBy: { createdAt: 'desc' }
            })

            // On renvoie la liste au format Discord { name, value }
            await interaction.respond(
                warns.map((w: any) => ({
                    name: `#${w.id} - ${w.reason.slice(0, 50)} (${new Date(w.createdAt).toLocaleDateString()})`,
                    value: w.id
                }))
            )
        } catch (error) {
            console.error('Erreur Autocomplete:', error)
            await interaction.respond([])
        }
    },

    /**
     * Exécution de la suppression
     */
    async execute(interaction: ChatInputCommandInteraction) {
        const warnId = interaction.options.getInteger('id')!
        const guildId = interaction.guildId!

        try {
            // 1. Vérification de l'existence du warn
            const warn = await prisma.warn.findUnique({
                where: { id: warnId }
            })

            if (!warn || warn.guildId !== guildId) {
                return interaction.reply({
                    content: `❌ Aucun avertissement trouvé avec l'ID **#${warnId}** sur ce serveur.`,
                    ephemeral: true
                })
            }

            // 2. Suppression dans la base de données
            await prisma.warn.delete({
                where: { id: warnId }
            })

            const embed = new EmbedBuilder()
                .setColor(0x2ecc71)
                .setTitle('✅ Avertissement supprimé')
                .setDescription(
                    `L'avertissement **#${warnId}** pour <@${warn.userId}> a été retiré.`
                )
                .addFields({ name: 'Raison originale', value: warn.reason })
                .setTimestamp()

            // 3. Envoi du log si configuré (Point 2)
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
        } catch (error: any) {
            console.error(error)
            return interaction.reply({
                content: `Une erreur est survenue lors de la suppression du warn.`,
                ephemeral: true
            })
        }
    }
}
