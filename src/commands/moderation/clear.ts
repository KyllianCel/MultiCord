import {
    SlashCommandBuilder,
    PermissionFlagsBits,
    ChatInputCommandInteraction,
    EmbedBuilder,
    TextChannel
} from 'discord.js'

export default {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Supprime un nombre précis de messages dans le salon.')
        .addIntegerOption((option) =>
            option
                .setName('montant')
                .setDescription('Nombre de messages à supprimer (1-100)')
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(100)
        )
        .addUserOption((option) =>
            option
                .setName('cible')
                .setDescription(
                    'Supprimer uniquement les messages de cet utilisateur (Optionnel)'
                )
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    async execute(interaction: ChatInputCommandInteraction) {
        const amount = interaction.options.getInteger('montant')!
        const target = interaction.options.getUser('cible')
        const channel = interaction.channel as TextChannel

        // Sécurité : Vérifier si on est bien dans un salon textuel
        if (!channel || !('bulkDelete' in channel)) {
            return interaction.reply({
                content:
                    'Cette commande ne peut être utilisée que dans un salon textuel.',
                ephemeral: true
            })
        }

        try {
            let messagesToDelete

            if (target) {
                // LOGIQUE FILTRÉE : On récupère les 100 derniers messages
                const messages = await channel.messages.fetch({ limit: 100 })

                // On filtre pour ne garder que ceux de la cible et on prend le "montant" demandé
                messagesToDelete = messages
                    .filter((m) => m.author.id === target.id)
                    .toJSON()
                    .slice(0, amount)
            }

            // On effectue la suppression
            // Si target existe, on passe la liste filtrée. Sinon, on passe juste le nombre.
            const deleted = await channel.bulkDelete(
                messagesToDelete || amount,
                true
            )

            const embed = new EmbedBuilder()
                .setColor(0x3498db)
                .setDescription(
                    target
                        ? `🧹 **${deleted.size}** messages de **${target.tag}** ont été supprimés.`
                        : `🧹 **${deleted.size}** messages ont été supprimés.`
                )
                .setFooter({ text: "Ce message s'effacera dans 5 secondes." })

            await interaction.reply({ embeds: [embed] })

            // --- AJOUT LOGS MODÉRATION ---
            const logChannelId = process.env.LOG_CHANNEL_ID
            if (logChannelId) {
                const logChannel =
                    interaction.guild?.channels.cache.get(logChannelId)
                if (logChannel?.isTextBased()) {
                    const logEmbed = new EmbedBuilder()
                        .setColor(0x3498db)
                        .setTitle('🧹 Nettoyage de salon')
                        .addFields(
                            {
                                name: 'Salon',
                                value: `<#${channel.id}>`,
                                inline: true
                            },
                            {
                                name: 'Modérateur',
                                value: `${interaction.user.tag}`,
                                inline: true
                            },
                            {
                                name: 'Montant',
                                value: `${deleted.size} messages`,
                                inline: true
                            }
                        )
                        .setTimestamp()

                    if (target)
                        logEmbed.addFields({
                            name: 'Cible',
                            value: `${target.tag}`
                        })

                    await logChannel.send({ embeds: [logEmbed] })
                }
            }

            setTimeout(() => {
                interaction.deleteReply().catch(() => {})
            }, 5000)
        } catch {
            return interaction.reply({
                content:
                    'Erreur : Impossible de supprimer des messages de plus de 14 jours.',
                ephemeral: true
            })
        }
    }
}
