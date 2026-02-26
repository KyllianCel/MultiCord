import {
    SlashCommandBuilder,
    PermissionFlagsBits,
    ChatInputCommandInteraction,
    EmbedBuilder
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
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    async execute(interaction: ChatInputCommandInteraction) {
        const amount = interaction.options.getInteger('montant')!
        const channel = interaction.channel

        // Sécurité : Vérifier si on est bien dans un salon textuel
        if (!channel || !('bulkDelete' in channel)) {
            return interaction.reply({
                content:
                    'Cette commande ne peut être utilisée que dans un salon textuel.',
                ephemeral: true
            })
        }

        try {
            // On supprime les messages
            const deleted = await channel.bulkDelete(amount, true)

            const embed = new EmbedBuilder()
                .setColor(0x3498db) // Bleu
                .setDescription(
                    `🧹 **${deleted.size}** messages ont été supprimés avec succès.`
                )
                .setFooter({ text: "Ce message s'effacera dans 5 secondes." })

            // On répond
            await interaction.reply({ embeds: [embed] })

            // Petit bonus : On supprime la réponse du bot après 5 secondes
            // pour garder le salon vraiment propre.
            setTimeout(() => {
                interaction.deleteReply().catch(() => {})
            }, 5000)
        } catch (error) {
            console.error(error)
            return interaction.reply({
                content:
                    'Une erreur est survenue : les messages de plus de 14 jours ne peuvent pas être supprimés par cette commande.',
                ephemeral: true
            })
        }
    }
}
