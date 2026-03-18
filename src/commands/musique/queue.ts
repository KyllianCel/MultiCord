import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, MessageFlags } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Affiche la liste des musiques à venir'),

    async execute(interaction: ChatInputCommandInteraction) {
        const client = interaction.client as any;
        const queue = client.queues.get(interaction.guildId);

        if (!queue || queue.tracks.length === 0) {
            return interaction.reply({
                content: "❌ La file d'attente est vide.",
                flags: [MessageFlags.Ephemeral]
            });
        }

        // On récupère la musique actuelle
        const nowPlaying = queue.tracks[0];
        // On récupère les 10 suivantes
        const upcoming = queue.tracks.slice(1, 11);

        const embed = new EmbedBuilder()
            .setTitle(`🎶 File d'attente - ${interaction.guild?.name}`)
            .setColor('#2b2d31')
            .addFields(
                {
                    name: '🎵 En train de jouer',
                    value: `**[${nowPlaying.trackData.info.title}](${nowPlaying.trackData.info.uri})**\nDemandé par : <@${nowPlaying.requester.id}>`
                }
            );

        if (upcoming.length > 0) {
            const list = upcoming
                .map((t: any, i: number) => `**${i + 1}.** [${t.trackData.info.title}](${t.trackData.info.uri}) — <@${t.requester.id}>`)
                .join('\n');

            embed.addFields({ name: '⏭️ À suivre', value: list });
        }

        // On affiche le nombre total de musiques restantes
        const totalTracks = queue.tracks.length;
        embed.setFooter({ text: `${totalTracks} musique(s) au total dans la file` });

        return interaction.reply({ embeds: [embed] });
    },
};