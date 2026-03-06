import {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    MessageFlags
} from 'discord.js'

export default {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Affiche la liste des musiques à venir'),

    async execute(interaction: ChatInputCommandInteraction) {
        const client = interaction.client as any
        const queue = client.queues.get(interaction.guildId)

        if (!queue || queue.tracks.length === 0) {
            return interaction.reply({
                content: "❌ La file d'attente est vide.",
                flags: [MessageFlags.Ephemeral]
            })
        }

        // On prépare l'affichage
        const nowPlaying = queue.tracks[0]
        const upcoming = queue.tracks.slice(1, 11) // On affiche les 10 prochaines

        const embed = new EmbedBuilder()
            .setTitle(
                `File d'attente pour ${interaction.guild?.name ?? 'le serveur'}`
            )
            .setColor('#00ff00')
            .addFields({
                name: '🎵 En train de jouer',
                value: `[${nowPlaying.info.title}](${nowPlaying.info.uri})`
            })

        if (upcoming.length > 0) {
            const list = upcoming
                .map(
                    (t: any, i: number) =>
                        `**${i + 1}.** [${t.info.title}](${t.info.uri})`
                )
                .join('\n')
            embed.addFields({ name: '⏭️ À suivre', value: list })
        }

        return interaction.reply({ embeds: [embed] })
    }
}
