import { ChatInputCommandInteraction, SlashCommandBuilder, MessageFlags } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Arrête la musique et vide la file d\'attente'),

    async execute(interaction: ChatInputCommandInteraction) {
        const client = interaction.client as any;
        const shoukaku = client.shoukaku;
        const guildId = interaction.guildId!;

        const player = shoukaku.players.get(guildId);

        if (!player) {
            return interaction.reply({ content: "❌ Je ne joue pas de musique.", flags: [MessageFlags.Ephemeral] });
        }

        try {
            // 1. On supprime la queue de la mémoire EN PREMIER
            client.queues.delete(guildId);

            // 2. On quitte le salon (ce qui déclenchera l'événement 'end', mais il sera ignoré)
            await shoukaku.leaveVoiceChannel(guildId);

            return interaction.reply("🛑 Musique arrêtée et file d'attente vidée. Au revoir !");
        } catch (e) {
            console.error(e);
            return interaction.reply("❌ Erreur lors de l'arrêt.");
        }
    },
};