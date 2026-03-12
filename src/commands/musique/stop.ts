import { ChatInputCommandInteraction, SlashCommandBuilder, MessageFlags } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Arrête la musique'),

    async execute(interaction: any) {
        const client = interaction.client as any;
        const shoukaku = client.shoukaku;
        const guildId = interaction.guildId!;

        const player = shoukaku.players.get(guildId);
        const queue = client.queues.get(guildId);

        if (!player) {
            const msg = "❌ Rien ne tourne actuellement.";
            return interaction.replied ? interaction.followUp({ content: msg, flags: [MessageFlags.Ephemeral] }) : interaction.reply({ content: msg, flags: [MessageFlags.Ephemeral] });
        }

        // On retire les boutons de la carte avant de partir
        if (queue && queue.message) {
            await queue.message.edit({ components: [] }).catch(() => {});
        }

        client.queues.delete(guildId);
        await shoukaku.leaveVoiceChannel(guildId);

        const content = `⏹️ Musique arrêtée par <@${interaction.user.id}> !`;
        return interaction.reply({ content });
    },
};