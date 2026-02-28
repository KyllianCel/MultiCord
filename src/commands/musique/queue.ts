import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, MessageFlags } from 'discord.js';
import { useQueue } from 'discord-player';

export default {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Affiche la file d\'attente actuelle.'),

    async execute(interaction: ChatInputCommandInteraction) {
        const queue = useQueue(interaction.guildId!);

        if (!queue || !queue.tracks.data.length) {
            return interaction.reply({ content: "❌ La file d'attente est vide !", flags: [MessageFlags.Ephemeral] });
        }

        const currentTrack = queue.currentTrack; // Musique en cours
        const tracks = queue.tracks.data.slice(0, 10); // 10 prochaines

        const embed = new EmbedBuilder()
            .setColor('#5865F2')
            .setTitle('🎶 File d\'attente')
            .setDescription(`**En cours :** [${currentTrack?.title}](${currentTrack?.url})`)
            .addFields({ 
                name: 'À venir :', 
                value: tracks.map((t, i) => `**${i + 1}.** [${t.title}](${t.url})`).join('\n') || 'Rien d\'autre dans la liste.'
            })
            .setTimestamp();

        return interaction.reply({ embeds: [embed] });
    },
};