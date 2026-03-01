import { ChatInputCommandInteraction, SlashCommandBuilder, MessageFlags } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Passe à la musique suivante'),

    async execute(interaction: ChatInputCommandInteraction) {
        const client = interaction.client as any;
        const shoukaku = client.shoukaku;
        const guildId = interaction.guildId!;

        // 1. On récupère le lecteur (player) pour ce serveur
        const player = shoukaku.players.get(guildId);
        const queue = client.queues.get(guildId);

        // 2. Vérifications de sécurité
        if (!player) {
            return interaction.reply({ 
                content: "❌ Je ne joue pas de musique actuellement sur ce serveur.", 
                flags: [MessageFlags.Ephemeral] 
            });
        }

        if (!queue || queue.tracks.length === 0) {
            return interaction.reply({ 
                content: "❌ La file d'attente est vide.", 
                flags: [MessageFlags.Ephemeral] 
            });
        }

        try {
            // 3. On arrête la piste actuelle
            // Cela va déclencher l'événement 'end' qu'on a créé dans play.ts
            await player.stopTrack();

            return interaction.reply(`⏩ Musique passée par **${interaction.user.username}** !`);
        } catch (e) {
            console.error(e);
            return interaction.reply("❌ Erreur lors du skip.");
        }
    },
};