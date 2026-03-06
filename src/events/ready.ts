import { Events, Client } from 'discord.js'
import Event from '../templates/Event.js'
import { Shoukaku, Connectors } from 'shoukaku'

export default new Event({
    name: Events.ClientReady,
    once: true,
    async execute(client: Client) {
        console.log(`✅ Logged in as ${client.user?.tag}!`)

        // 1. On prépare les données proprement
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
            // 2. On crée l'instance Shoukaku
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

            // 3. ON ATTACHE AU CLIENT SEULEMENT APRÈS LA DÉCLARATION
            ;(client as any).shoukaku = shoukaku
            ;(client as any).queues = new Map()

            // 4. Événements avec types explicites pour éviter le "Implicit any"
            shoukaku.on('ready', (name: string) => {
                console.log(
                    `⭐ [Lavalink] Le nœud "${name}" est ENFIN CONNECTÉ !`
                )
            })

            shoukaku.on('error', (name: string, error: Error) => {
                console.error(
                    `❌ [Lavalink] Erreur sur ${name}:`,
                    error.message
                )
            })

            shoukaku.on(
                'close',
                (name: string, code: number, reason: string) => {
                    console.warn(
                        `⚠️ [Lavalink] Connexion fermée sur ${name}. Code: ${code}, Raison: ${reason || 'Inconnue'}`
                    )
                }
            )

            shoukaku.on('debug', (name: string, info: string) => {
                if (
                    info.toLowerCase().includes('fail') ||
                    info.toLowerCase().includes('connect')
                ) {
                    console.log(`🔍 [Shoukaku Debug] ${name}: ${info}`)
                }
            })
        } catch (err) {
            console.error(
                "❌ Erreur lors de l'initialisation de Shoukaku :",
                err
            )
        }

        console.log(`🚀 MultiCord est prêt !`)
    }
})
