import {
    ChatInputCommandInteraction, SlashCommandBuilder, AutocompleteInteraction,
    EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, MessageFlags
} from 'discord.js';

const idleTimers = new Map<string, NodeJS.Timeout>();

export default {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Joue une musique (Requester dynamique)')
        .addStringOption(option =>
            option.setName('recherche')
                .setDescription('Titre ou URL SoundCloud')
                .setRequired(true)
                .setAutocomplete(true)),

    async autocomplete(interaction: AutocompleteInteraction) {
        const client = interaction.client as any;
        const shoukaku = client.shoukaku;
        const focusedValue = interaction.options.getFocused();
        if (!focusedValue || focusedValue.length < 3) return interaction.respond([]);

        try {
            const node = shoukaku.nodes.get('LocalNode') || [...shoukaku.nodes.values()][0];
            if (!node) return interaction.respond([]);

            const result = await node.rest.resolve(`scsearch:${focusedValue}`);
            let tracks: any[] = [];
            if (result?.data) {
                tracks = Array.isArray(result.data) ? result.data : (result.data as any).tracks || [];
            }

            const filteredResults = tracks
                .filter((track: any) => !track.info.identifier.includes('preview') && track.info.length > 31000)
                .slice(0, 10);

            return interaction.respond(
                filteredResults.map((track: any) => ({
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
        const guildId = interaction.guildId!;

        if (!voiceChannel) return interaction.reply({ content: "❌ Tu dois être en vocal !", flags: [MessageFlags.Ephemeral] });

        if (idleTimers.has(guildId)) {
            clearTimeout(idleTimers.get(guildId));
            idleTimers.delete(guildId);
        }

        const node = shoukaku.nodes.get('LocalNode') || [...shoukaku.nodes.values()][0];
        if (!node) return interaction.reply({ content: "❌ Serveur musical indisponible.", flags: [MessageFlags.Ephemeral] });

        let queue = client.queues.get(guildId);
        let player = shoukaku.players.get(guildId);

        // --- FONCTION DE RECHERCHE INTERNE ---
        const getTrack = async (q: string) => {
            let res = await node.rest.resolve(q.startsWith('http') ? q : `scsearch:${q}`);
            const validate = (data: any) => {
                if (Array.isArray(data)) return data.find((t: any) => !t.info.identifier.includes('preview') && t.info.length > 31000);
                return (data && data.info && !data.info.identifier.includes('preview') && data.info.length > 31000) ? data : null;
            };
            let track = validate(res.data);
            if (!track) {
                const searchName = (res.data && !Array.isArray(res.data)) ? `${(res.data as any).info.author} ${(res.data as any).info.title}` : q;
                const altRes = await node.rest.resolve(`scsearch:${searchName}`);
                track = validate(altRes.data);
            }
            return track;
        };

        // --- SI DÉJÀ EN COURS ---
        if (player && queue) {
            const track = await getTrack(query);
            if (!track) return interaction.reply({ content: "❌ Impossible de trouver une version complète.", flags: [MessageFlags.Ephemeral] });

            // On stocke le morceau ET l'utilisateur qui l'a demandé
            queue.tracks.push({ trackData: track, requester: interaction.user });

            if (queue.message) {
                const current = queue.tracks[0];
                const { embed, row } = this.generateCardData(client, guildId, current.trackData, current.requester);
                await queue.message.edit({ embeds: [embed], components: [row] }).catch(() => {});
            }

            return interaction.reply({ content: `✅ **${track.info.title}** ajouté à la file par <@${interaction.user.id}> !` });
        }

        await interaction.deferReply();

        try {
            const track = await getTrack(query);
            if (!track) return interaction.editReply("❌ Aucun morceau complet trouvé.");

            // Structure de la queue : on stocke des objets { trackData, requester }
            queue = { tracks: [{ trackData: track, requester: interaction.user }], channel: interaction.channel, message: null };
            client.queues.set(guildId, queue);

            player = await shoukaku.joinVoiceChannel({
                guildId: guildId, channelId: voiceChannel.id, shardId: 0, deaf: true
            });

            player.on('end', async () => {
                const q = client.queues.get(guildId);
                if (!q) return;

                if (q.message) await q.message.edit({ components: [] }).catch(() => {});

                q.tracks.shift();

                if (q.tracks.length > 0) {
                    const next = q.tracks[0];
                    await player.playTrack({ track: { encoded: next.trackData.encoded } });
                    this.sendNewCard(client, guildId, next.trackData, next.requester);
                } else {
                    const timeout = setTimeout(async () => {
                        client.queues.delete(guildId);
                        await shoukaku.leaveVoiceChannel(guildId);
                    }, 60000);
                    idleTimers.set(guildId, timeout);
                }
            });

            await player.playTrack({ track: { encoded: track.encoded } });
            this.sendNewCard(client, guildId, track, interaction.user, interaction);

        } catch (e) {
            return interaction.editReply("❌ Erreur lors de la lecture.");
        }
    },

    generateCardData(client: any, guildId: string, track: any, requester: any) {
        const queue = client.queues.get(guildId);
        const guild = client.guilds.cache.get(guildId);
        const duration = `${Math.floor(track.info.length / 60000)}:${String(Math.floor((track.info.length % 60000) / 1000)).padStart(2, '0')}`;

        const embed = new EmbedBuilder()
            .setAuthor({ name: guild?.name || 'Musique', iconURL: guild?.iconURL() || client.user.displayAvatarURL() })
            .setTitle('Now Playing')
            .setDescription(`**${track.info.title} — ${track.info.author}**`)
            .setThumbnail(track.info.artworkUrl || null)
            .addFields(
                { name: 'Duration', value: `\`${duration}\``, inline: true },
                { name: 'Queue', value: `\`${queue.tracks.length - 1}\``, inline: true },
                { name: 'Requester', value: `<@${requester.id}>` }
            )
            .setColor('#2b2d31');

        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder().setCustomId('btn_skip').setLabel('Skip').setEmoji('⏭️').setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId('btn_stop').setLabel('Stop').setEmoji('⏹️').setStyle(ButtonStyle.Danger)
        );

        return { embed, row };
    },

    async sendNewCard(client: any, guildId: string, track: any, requester: any, interaction?: any) {
        const queue = client.queues.get(guildId);
        const { embed, row } = this.generateCardData(client, guildId, track, requester);

        let msg;
        if (interaction && interaction.deferred) {
            msg = await interaction.editReply({ embeds: [embed], components: [row] });
        } else {
            msg = await queue.channel.send({ embeds: [embed], components: [row] });
        }

        queue.message = msg;

        const collector = msg.createMessageComponentCollector({ componentType: ComponentType.Button });
        collector.on('collect', async (i: any) => {
            const skipCmd = client.commands.get('skip');
            const stopCmd = client.commands.get('stop');
            if (i.customId === 'btn_skip' && skipCmd) await skipCmd.execute(i);
            else if (i.customId === 'btn_stop' && stopCmd) await stopCmd.execute(i);
        });
    }
};