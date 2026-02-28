import { ChatInputCommandInteraction, SlashCommandBuilder, MessageFlags } from 'discord.js';
import { useQueue } from 'discord-player';

export default {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Arrête la musique et déconnecte le bot.'),

    async execute(interaction: ChatInputCommandInteraction) {
        const queue = useQueue(interaction.guildId!);

        if (!queue) {
            return interaction.reply({ content: "❌ Je ne suis pas en train de jouer !", flags: [MessageFlags.Ephemeral] });
        }

        queue.delete(); // Supprime la file et déconnecte
        return interaction.reply("🛑 Musique arrêtée. À la prochaine !");
    },
};