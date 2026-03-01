import { ChatInputCommandInteraction, SlashCommandBuilder, AutocompleteInteraction, MessageFlags } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Joue une musique (Technique du Ghost Bridge)')
        .addStringOption(option => 
            option.setName('recherche')
                .setDescription('Titre ou URL')
                .setRequired(true)
                .setAutocomplete(true)),

    async autocomplete(interaction: AutocompleteInteraction) {
        const client = interaction.client as any;
        const shoukaku = client.shoukaku;
        const focusedValue = interaction.options.getFocused();

        if (!focusedValue || focusedValue.length < 3) return interaction.respond([]);

        try {
            const node = shoukaku.options.nodeResolver(shoukaku.nodes);
            const result = await node.rest.resolve(`scsearch:${focusedValue}`);

            if (result.loadType !== 'search' || !Array.isArray(result.data)) return interaction.respond([]);

            return interaction.respond(
                result.data.slice(0, 10).map((track: any) => ({
                    name: `${track.info.title} - ${track.info.author}`.slice(0, 100),
                    value: track.info.uri.slice(0, 100) 
                }))
            );
        } catch (e) {
            return interaction.respond([]);
        }
    },

    async execute(interaction: ChatInputCommandInteraction) {
        const client = interaction.client as any;
        const shoukaku = client.shoukaku;
        const query = interaction.options.getString('recherche', true);
        const voiceChannel = (interaction.member as any).voice.channel;

        if (!voiceChannel) return interaction.reply({ content: "❌ Tu dois être en vocal !", flags: [MessageFlags.Ephemeral] });

        await interaction.deferReply();

        try {
            const node = shoukaku.options.nodeResolver(shoukaku.nodes);
            
            // 1. On cherche d'abord sur SoundCloud
            let result = await node.rest.resolve(query.startsWith('http') ? query : `scsearch:${query}`);

            // 2. FILTRE ANTI-PREVIEW : On cherche un morceau qui n'est PAS un preview
            let track;
            if (result.data && Array.isArray(result.data)) {
                // On cherche le premier morceau dont l'identifiant ne contient pas "preview"
                track = result.data.find((t: any) => !t.info.identifier.includes('preview'));
            } else {
                track = result.data;
            }

            // 3. SI TOUT ÉCHOUE SUR SOUNDCLOUD, ON TENTE LE BRIDGE YOUTUBE MAIS AVEC UN TRY/CATCH
            if (!track || (track.info.identifier.includes('preview'))) {
                const bridgeQuery = query.startsWith('http') ? query : `ytsearch:${query}`;
                const ytResult = await node.rest.resolve(bridgeQuery);
                if (ytResult.data && (ytResult.loadType === 'track' || ytResult.loadType === 'search')) {
                    track = Array.isArray(ytResult.data) ? ytResult.data[0] : ytResult.data;
                }
            }

            if (!track) return interaction.editReply("❌ Impossible de trouver une version complète de ce morceau.");

            let player = shoukaku.players.get(interaction.guildId);
            let queue = client.queues.get(interaction.guildId);

            if (!queue) {
                queue = { tracks: [], channel: interaction.channel };
                client.queues.set(interaction.guildId, queue);
            }

            queue.tracks.push(track);

            if (!player) {
                player = await shoukaku.joinVoiceChannel({
                    guildId: interaction.guildId!,
                    channelId: voiceChannel.id,
                    shardId: 0
                });

                // On ajoute un catch sur le playTrack pour éviter que le bot ne quitte sans rien dire
                player.on('end', () => {
                    const currentQueue = client.queues.get(interaction.guildId);
                    if (!currentQueue) return;
                    currentQueue.tracks.shift();
                    if (currentQueue.tracks.length > 0) {
                        const nextTrack = currentQueue.tracks[0];
                        player.playTrack({ track: { encoded: nextTrack.encoded } }).catch(() => {});
                    } else {
                        client.queues.delete(interaction.guildId);
                        shoukaku.leaveVoiceChannel(interaction.guildId!);
                    }
                });

                await player.playTrack({ track: { encoded: track.encoded } });
                return interaction.editReply(`🎶 En train de jouer : **${track.info.title}**`);
            } else {
                return interaction.editReply(`✅ Ajouté à la file : **${track.info.title}**`);
            }
        } catch (e) {
            console.error(e);
            return interaction.editReply("❌ Erreur Lavalink (Signature YouTube probablement HS).");
        }
    }
};