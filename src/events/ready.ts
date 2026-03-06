import { Events, Client } from 'discord.js'
import Event from '../templates/Event.js'
import { Shoukaku, Connectors } from 'shoukaku'

export default new Event({
    name: Events.ClientReady,
    once: true,
    async execute(client: Client) {
        console.log(`✅ Logged in as ${client.user?.tag}!`)

        // 1. Extraction et nettoyage des variables d'environnement
        const host = (process.env.LAVALINK_HOST || '127.0.0.1').trim()
        const port = (process.env.LAVALINK_PORT || '2333').toString().trim()
        const password = (
            process.env.LAVALINK_PASSWORD || 'youshallnotpass'
        ).trim()

        // Log de diagnostic pour vérifier l'URL de connexion
        console.log(`🔍 Tentative de connexion Lavalink sur : ${host}:${port}`)

        const Nodes = [
            {
                name: 'LocalNode',
                url: `${host}:${port}`,
                auth: password,
                secure: false
            }
        ]

        // 2. On attend 5 secondes avant de lancer Shoukaku
        // Cela évite que le bot tente de se connecter pendant que Lavalink "chauffe" encore
        setTimeout(() => {
            const shoukaku = new Shoukaku(
                new Connectors.DiscordJS(client as any),
                Nodes,
                {
                    moveOnDisconnect: true,
                    resume: true,
                    reconnectTries: 10,
                    reconnectInterval: 5
                }
            )

            ;(client as any).shoukaku = shoukaku
            ;(client as any).queues = new Map()

            // Événements de statut
            shoukaku.on('ready', (name) => {
                console.log(`✅ Lavalink Node "${name}" est ENFIN PRÊT !`)
            })

            shoukaku.on('error', (name, error) => {
                console.error(`❌ ERREUR Shoukaku sur ${name}:`, error.message)
            })

            shoukaku.on('close', (name, code, reason) => {
                console.log(
                    `⚠️ Shoukaku a FERMÉ la connexion (${name}). Code: ${code}, Raison: ${reason || 'Aucune'}`
                )
            })

            shoukaku.on('disconnect', (name, count) => {
                console.log(
                    `ℹ️ Shoukaku DÉCONNECTÉ de ${name}. Joueurs impactés: ${count}`
                )
            })

            console.log(
                `🚀 Système de musique initialisé, attente du signal "Ready" de Lavalink...`
            )
        }, 5000)
    }
})
