import { Events, Client } from 'discord.js'
import Event from '../templates/Event.js'
import { Shoukaku, Connectors } from 'shoukaku'

export default new Event({
    name: Events.ClientReady,
    once: true,
    async execute(client: Client) {
        console.log(`✅ Logged in as ${client.user?.tag}!`)

        const Nodes = [
            {
                name: 'LocalNode',
                url: `${process.env.LAVALINK_HOST || '127.0.0.1'}:${process.env.LAVALINK_PORT || '2333'}`,
                auth: process.env.LAVALINK_PASSWORD || 'youshallnotpass',
                secure: false
            }
        ]

        const shoukaku = new Shoukaku(
            new Connectors.DiscordJS(client as any),
            Nodes,
            {
                moveOnDisconnect: true,
                resume: true,
                reconnectTries: 5,
                reconnectInterval: 5
            }
        )

        ;(client as any).shoukaku = shoukaku
        ;(client as any).queues = new Map()

        // Événements corrigés pour Shoukaku v4
        shoukaku.on('ready', (name) => {
            console.log(`✅ Lavalink Node "${name}" est ENFIN PRÊT !`)
        })

        shoukaku.on('error', (name, error) => {
            console.error(`❌ ERREUR Shoukaku sur ${name}:`, error.message)
        })

        // Utilisation de "_" pour les variables volontairement ignorées (ESLint)
        shoukaku.on('close', (name, code, reason) => {
            console.log(
                `⚠️ Shoukaku a FERMÉ la connexion (${name}). Code: ${code}, Raison: ${reason || 'Aucune'}`
            )
        })

        // Correction de la signature : 2 arguments attendus (name, count)
        shoukaku.on('disconnect', (name, count) => {
            console.log(
                `ℹ️ Shoukaku DÉCONNECTÉ de ${name}. Joueurs impactés: ${count}`
            )
        })

        console.log(`🚀 Système de musique initialisé, attente de Lavalink...`)
    }
})
