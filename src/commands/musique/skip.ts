import { ChatInputCommandInteraction, SlashCommandBuilder, MessageFlags } from 'discord.js';
import { useQueue } from 'discord-player';

export default {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Passe à la musique suivante.'),

    async execute(interaction: ChatInputCommandInteraction) {
        const queue = useQueue(interaction.guildId!);

        if (!queue || !queue.isPlaying()) {
            return interaction.reply({ content: "❌ Aucune musique en cours !", flags: [MessageFlags.Ephemeral] });
        }

        queue.node.skip();
        return interaction.reply(`⏭️ Musique passée par **${interaction.user.username}** !`);
    },
};