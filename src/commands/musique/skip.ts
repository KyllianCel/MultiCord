import { ChatInputCommandInteraction, SlashCommandBuilder, MessageFlags } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Passe à la musique suivante'),

    async execute(interaction: ChatInputCommandInteraction) {
        const client = interaction.client as any;
        const shoukaku = client.shoukaku;
        const guildId = interaction.guildId!;

        const player = shoukaku.players.get(guildId);
        const queue = client.queues.get(guildId);

        if (!player) return interaction.reply({ content: "❌ Rien ne tourne.", ephemeral: true });

        // Si c'est la dernière musique, on appelle STOP
        if (!queue || queue.tracks.length <= 1) {
            return await client.commands.get('stop').execute(interaction);
        }

        try {
            await player.stopTrack(); // Cela déclenchera l'événement 'end' dans play.ts, qui mettra à jour la carte

            // Réponse éphémère ou normale avec mention
            const content = `⏩ Musique passée par <@${interaction.user.id}> !`;
            if (interaction.isButton()) return interaction.reply({ content, ephemeral: false });
            return interaction.reply(content);
        } catch (e) {
            return interaction.reply({ content: "❌ Erreur skip.", ephemeral: true });
        }
    },
};