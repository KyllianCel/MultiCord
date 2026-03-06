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

        console.log(`⏳ En attente de Lavalink sur ${host}:${port}...`)

        // FONCTION DE CONNEXION FORCÉE
        const connectLavalink = () => {
            try {
                const shoukaku = new Shoukaku(
                    new Connectors.DiscordJS(client as any),
                    Nodes,
                    {
                        moveOnDisconnect: true,
                        resume: true,
                        reconnectTries: 100, // On insiste lourdement
                        reconnectInterval: 5
                    }
                )

                ;(client as any).shoukaku = shoukaku
                ;(client as any).queues = new Map()

                shoukaku.on('ready', (name: string) => {
                    console.log(
                        `⭐ [LAVALINK] Connexion réussie au nœud : ${name}`
                    )
                })

                shoukaku.on('error', (name: string, error: Error) => {
                    console.error(
                        `❌ [LAVALINK] Erreur sur ${name}: ${error.message}`
                    )
                })

                shoukaku.on('debug', (name: string, info: string) => {
                    // On log TOUT le debug pour comprendre le blocage
                    console.log(`🔍 [DEBUG ${name}] ${info}`)
                })
            } catch (err) {
                console.error("❌ Erreur d'initialisation Shoukaku:", err)
            }
        }

        // On attend 10 secondes après le boot du bot pour être SÛR que Lavalink a fini
        setTimeout(() => {
            console.log('🚀 Lancement de la connexion Shoukaku...')
            connectLavalink()
        }, 10000)

        console.log(`🚀 MultiCord est prêt ! (Musique dans 10s)`)
    }
})
