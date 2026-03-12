import {
    ChatInputCommandInteraction, SlashCommandBuilder, AutocompleteInteraction,
    EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, MessageFlags
} from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Joue une musique')
        .addStringOption(option =>
            option.setName('recherche').setDescription('Titre ou URL').setRequired(true).setAutocomplete(true)),

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
                if (Array.isArray(result.data)) tracks = result.data;
                else if ((result.data as any).tracks) tracks = (result.data as any).tracks;
            }

            return interaction.respond(
                tracks.slice(0, 10).map((track: any) => ({
                    name: `${track.info.title} — ${track.info.author}`.slice(0, 100),
                    value: track.info.uri.slice(0, 100)
                }))
            );
        } catch (e) {
            return interaction.respond([]);
        }
    },

    // --- FONCTION DE RECHERCHE UNIFIÉE ---
    async searchTrack(shoukaku: any, query: string) {
        const node = shoukaku.nodes.get('LocalNode') || [...shoukaku.nodes.values()][0];
        if (!node) return null;

        const search = query.startsWith('http') ? query : `scsearch:${query}`;
        const result = await node.rest.resolve(search);

        if (!result || !result.data) return null;

        // Lavalink v4 renvoie soit un objet avec .tracks, soit directement un tableau
        if (result.loadType === 'track' || result.loadType === 'TRACK') return result.data;

        const tracks = Array.isArray(result.data) ? result.data : (result.data as any).tracks;
        return tracks && tracks.length > 0 ? tracks[0] : null;
    },

    async execute(interaction: ChatInputCommandInteraction) {
        const client = interaction.client as any;
        const shoukaku = client.shoukaku;
        const query = interaction.options.getString('recherche', true);
        const voiceChannel = (interaction.member as any).voice.channel;
        const guildId = interaction.guildId!;

        if (!voiceChannel) return interaction.reply({ content: "❌ Vocal requis.", flags: [MessageFlags.Ephemeral] });

        let queue = client.queues.get(guildId);
        let player = shoukaku.players.get(guildId);

        // --- SI LA MUSIQUE TOURNE DÉJÀ (AJOUT À LA FILE) ---
        if (player && queue) {
            const track = await this.searchTrack(shoukaku, query);
            if (!track) return interaction.reply({ content: "❌ Deuxième musique introuvable.", flags: [MessageFlags.Ephemeral] });

            queue.tracks.push(track);
            // On met à jour le message actuel pour changer le chiffre "Queue"
            if (queue.message) {
                const { embed, row } = this.generateCardData(client, guildId, queue.tracks[0], queue.requester);
                await queue.message.edit({ embeds: [embed], components: [row] }).catch(() => {});
            }

            return interaction.reply({ content: `✅ **${track.info.title}** ajouté à la file !` });
        }

        await interaction.deferReply();

        try {
            const track = await this.searchTrack(shoukaku, query);
            if (!track) return interaction.editReply("❌ Aucun morceau trouvé.");

            queue = { tracks: [track], channel: interaction.channel, message: null, requester: interaction.user };
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
                    await player.playTrack({ track: { encoded: q.tracks[0].encoded } });
                    this.sendNewCard(client, guildId, q.tracks[0], q.requester);
                } else {
                    client.queues.delete(guildId);
                    await shoukaku.leaveVoiceChannel(guildId);
                }
            });

            await player.playTrack({ track: { encoded: track.encoded } });
            this.sendNewCard(client, guildId, track, interaction.user, interaction);

        } catch (e) {
            console.error(e);
            return interaction.editReply("❌ Erreur lors de la lecture.");
        }
    },

    // Génère les données de l'embed (utilisé pour send et update)
    generateCardData(client: any, guildId: string, track: any, requester: any) {
        const queue = client.queues.get(guildId);
        const guild = client.guilds.cache.get(guildId);
        const duration = `${Math.floor(track.info.length / 60000)}:${String(Math.floor((track.info.length % 60000) / 1000)).padStart(2, '0')}`;

        const embed = new EmbedBuilder()
            .setAuthor({ name: guild.name, iconURL: guild.iconURL() })
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