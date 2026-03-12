import { VoiceState } from 'discord.js';

const leaveTimeouts = new Map<string, NodeJS.Timeout>();

export default {
    name: 'voiceStateUpdate',
    once: false,
    async execute(oldState: VoiceState, newState: VoiceState) {
        const client = oldState.client as any;
        const guildId = oldState.guild.id;
        const shoukaku = client.shoukaku;

        const player = shoukaku.players.get(guildId);
        if (!player) return;

        // On utilise l'ID du salon où le bot est connecté selon Discord
        const botChannelId = oldState.guild.members.me?.voice.channelId;
        if (!botChannelId) return;

        // Si quelqu'un quitte le salon du bot
        if (oldState.channelId === botChannelId && newState.channelId !== botChannelId) {
            const channel = oldState.guild.channels.cache.get(botChannelId) as any;
            if (!channel) return;

            // On filtre les bots pour voir s'il reste des "vrais" humains
            const humanMembers = channel.members.filter((m: any) => !m.user.bot);
            
            console.log(`👥 Membres restants dans le vocal : ${humanMembers.size}`);

            if (humanMembers.size === 0) {
                console.log(`⏱️ Salon vide ! Déconnexion dans 5 secondes...`);
                
                const timeout = setTimeout(async () => {
                    client.queues.delete(guildId);
                    await shoukaku.leaveVoiceChannel(guildId);
                    console.log(`🚪 Le bot a quitté le salon (vacant).`);
                    leaveTimeouts.delete(guildId);
                }, 5000);

                leaveTimeouts.set(guildId, timeout);
            }
        }

        // Si quelqu'un revient, on annule
        if (newState.channelId === botChannelId && oldState.channelId !== botChannelId) {
            const timeout = leaveTimeouts.get(guildId);
            if (timeout) {
                clearTimeout(timeout);
                leaveTimeouts.delete(guildId);
                console.log(`✅ Quelqu'un est revenu, annulation de la déconnexion.`);
            }
        }
    }
};