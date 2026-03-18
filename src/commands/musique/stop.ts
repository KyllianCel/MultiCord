import { ChatInputCommandInteraction, SlashCommandBuilder, MessageFlags } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Arrête la musique et vide la file'),

    async execute(interaction: any) {
        const client = interaction.client as any;
        const shoukaku = client.shoukaku;
        const guildId = interaction.guildId!;

        const player = shoukaku.players.get(guildId);
        const queue = client.queues.get(guildId);

        // Vérification si un player existe
        if (!player) {
            const msg = "❌ Rien ne tourne actuellement.";
            if (interaction.replied || interaction.deferred) {
                return interaction.followUp({ content: msg, flags: [MessageFlags.Ephemeral] });
            }
            return interaction.reply({ content: msg, flags: [MessageFlags.Ephemeral] });
        }

        try {
            // Nettoyage de l'interface
            if (queue && queue.message) {
                await queue.message.edit({ components: [] }).catch(() => {});
            }

            
            // On accède à la Map idleTimers via le fichier de commande ou le client
            const idleTimers = (client as any).idleTimers;
            if (idleTimers && idleTimers.has(guildId)) {
                clearTimeout(idleTimers.get(guildId));
                idleTimers.delete(guildId);
            }

            // On vide la file et on quitte
            client.queues.delete(guildId);
            await shoukaku.leaveVoiceChannel(guildId);

            const content = `⏹️ Musique arrêtée par <@${interaction.user.id}> !`;

            if (interaction.isButton()) return interaction.reply({ content });
            return interaction.reply({ content });

        } catch (e) {
            console.error(e);
            const errorMsg = "❌ Erreur lors de l'arrêt.";
            if (interaction.replied || interaction.deferred) return interaction.followUp(errorMsg);
            return interaction.reply(errorMsg);
        }
    },
};