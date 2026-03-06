import { Events, Client } from 'discord.js'
import Event from '../templates/Event.js'
import { Shoukaku, Connectors } from 'shoukaku'

export default new Event({
    name: Events.ClientReady,
    once: true,
    async execute(client: Client) {
        console.log(`✅ Logged in as ${client.user?.tag}!`)

        const host = (process.env.LAVALINK_HOST || '127.0.0.1').trim()
        const port = (process.env.LAVALINK_PORT || '2333').toString().trim()
        const password = (
            process.env.LAVALINK_PASSWORD || 'youshallnotpass'
        ).trim()

        const Nodes = [
            {
                name: 'LocalNode',
                url: `${host}:${port}`,
                auth: password,
                secure: false
            }
        ]

        console.log(`🔍 Tentative de connexion sur ${host}:${port}`)

        try {
            // Initialisation de Shoukaku
            const shoukakuInstance = new Shoukaku(
                new Connectors.DiscordJS(client as any),
                Nodes,
                {
                    moveOnDisconnect: true,
                    resume: true,
                    reconnectTries: 10,
                    reconnectInterval: 5
                }
            )

            // On attache les événements AVANT d'attacher au client
            shoukakuInstance.on('ready', (name: string) => {
                console.log(
                    `⭐ [Lavalink] Le nœud "${name}" est ENFIN CONNECTÉ !`
                )
            })

            shoukakuInstance.on('error', (name: string, error: Error) => {
                console.error(
                    `❌ [Lavalink] Erreur sur ${name}:`,
                    error.message
                )
            })

            // On injecte tout dans le client
            const extendedClient = client as any
            extendedClient.shoukaku = shoukakuInstance
            extendedClient.queues = new Map()

            console.log(`🚀 Système de musique initialisé avec succès !`)
        } catch (err) {
            console.error(
                '❌ ERREUR FATALE lors de la création de Shoukaku :',
                err
            )
        }

        console.log(`🚀 MultiCord est prêt !`)
    }
})
