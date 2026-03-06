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

        try {
            const shoukaku = new Shoukaku(
                new Connectors.DiscordJS(client as any),
                Nodes,
                {
                    moveOnDisconnect: true,
                    resume: true,
                    reconnectTries: 20,
                    reconnectInterval: 5
                }
            )

            const extendedClient = client as any
            extendedClient.shoukaku = shoukaku
            extendedClient.queues = new Map()

            // Événements de base avec types explicites
            shoukaku.on('ready', (name: string) =>
                console.log(
                    `⭐ [SUCCESS] Le nœud Lavalink "${name}" est CONNECTÉ !`
                )
            )
            shoukaku.on('error', (name: string, error: Error) =>
                console.error(`❌ [ERROR] Lavalink ${name}:`, error.message)
            )
            shoukaku.on('debug', (name: string, info: string) => {
                if (
                    info.toLowerCase().includes('fail') ||
                    info.toLowerCase().includes('connect')
                ) {
                    console.log(`🔍 [DEBUG] ${name}: ${info}`)
                }
            })

            // SCANNER D'ÉTAT (Correction : .reconnects au lieu de .reconnectAttempts)
            const checkState = setInterval(() => {
                const node = shoukaku.nodes.get('LocalNode')
                if (node) {
                    // node.state : 0 = DISCONNECTED, 1 = CONNECTED, 2 = CONNECTING
                    console.log(
                        `[Lavalink Stats] Etat: ${node.state} | Tentatives: ${node.reconnects}`
                    )

                    if (node.state === 1) {
                        console.log('🎊 LA CONNEXION EST ENFIN ÉTABLIE !')
                        clearInterval(checkState)
                    }
                }
            }, 5000)

            console.log(`🚀 Système initialisé sur ${host}:${port}.`)
        } catch (err) {
            console.error('❌ Échec critique de Shoukaku :', err)
        }

        console.log(`🚀 MultiCord est prêt !`)
    }
})
