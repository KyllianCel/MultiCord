import { VoiceState } from 'discord.js';

// Map pour stocker les timers de déconnexion par serveur
const leaveTimeouts = new Map<string, NodeJS.Timeout>();

export default {
    name: 'voiceStateUpdate',
    once: false,
    async execute(oldState: VoiceState, newState: VoiceState) {
        const client = oldState.client as any;
        const guildId = oldState.guild.id;
        const shoukaku = client.shoukaku;

        // On récupère le player Lavalink pour ce serveur
        const player = shoukaku.players.get(guildId);
        if (!player) return;

        // On récupère le salon vocal où se trouve le bot
        const botChannelId = player.voiceChannelId;
        
        // Si quelqu'un quitte le salon où se trouve le bot
        if (oldState.channelId === botChannelId && newState.channelId !== botChannelId) {
            const channel = oldState.guild.channels.cache.get(botChannelId!) as any;
            
            // On compte les membres (en ignorant les bots)
            const membersCount = channel?.members.filter((m: any) => !m.user.bot).size;

            if (membersCount === 0) {
                // S'il n'y a plus personne, on lance le chrono de 5 secondes
                const timeout = setTimeout(async () => {
                    // Nettoyage de la file d'attente
                    client.queues.delete(guildId);
                    
                    // Le bot quitte le vocal
                    await shoukaku.leaveVoiceChannel(guildId);
                    
                    console.log(`⏱️ Auto-déconnexion : Salon vide sur ${oldState.guild.name}`);
                    leaveTimeouts.delete(guildId);
                }, 5000);

                leaveTimeouts.set(guildId, timeout);
            }
        }

        // Si quelqu'tous rejoint le salon, on annule le chrono
        if (newState.channelId === botChannelId && oldState.channelId !== botChannelId) {
            const timeout = leaveTimeouts.get(guildId);
            if (timeout) {
                clearTimeout(timeout);
                leaveTimeouts.delete(guildId);
                console.log(`✅ Chrono annulé : Quelqu'un a rejoint le vocal sur ${newState.guild.name}`);
            }
        }
    }
};