import { ChatInputCommandInteraction, SlashCommandBuilder, MessageFlags } from 'discord.js';
import { useMainPlayer } from 'discord-player';

export default {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Joue une musique depuis YouTube ou Spotify.')
        .addStringOption(option => 
            option.setName('recherche')
                .setDescription('Le nom ou l\'URL de la musique')
                .setRequired(true)),

    async execute(interaction: ChatInputCommandInteraction) {
        const player = useMainPlayer();
        const query = interaction.options.getString('recherche', true);
        const channel = (interaction.member as any).voice.channel;

        // 1. Vérifier si l'utilisateur est en vocal
        if (!channel) {
            return interaction.reply({ 
                content: "❌ Tu dois être dans un salon vocal !", 
                flags: [MessageFlags.Ephemeral] 
            });
        }

        await interaction.deferReply(); // La recherche peut prendre du temps

        try {
            const { track } = await player.play(channel, query, {
                nodeOptions: {
                    metadata: interaction, // On garde l'interaction pour plus tard
                    selfDeaf: false, // <== Change ceci à false pour qu'il ne soit plus en sourdine
                    volume: 80,      // On s'assure que le volume n'est pas à 0
                    leaveOnEmpty: true,
                    leaveOnEnd: true,
                }
            });

            return interaction.followUp(`✅ **${track.title}** ajouté à la file d'attente !`);
        } catch (e) {
            console.error(e);
            return interaction.followUp(`❌ Erreur : Impossible de jouer cette musique.`);
        }
    },
};