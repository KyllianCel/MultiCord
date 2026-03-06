import { Events, Client } from 'discord.js'
import Event from '../templates/Event.js'
import { Shoukaku, Connectors } from 'shoukaku'

export default new Event({
    name: Events.ClientReady,
    once: true,
    async execute(client: Client) {
        console.log(`✅ Logged in as ${client.user?.tag}!`)

        // On nettoie les variables
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

        setTimeout(() => {
            console.log(
                `⚙️ Tentative de connexion Shoukaku sur ${host}:${port}...`
            )

            try {
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

                // Événements de diagnostic
                shoukaku.on('ready', (name) =>
                    console.log(`⭐ [LAVALINK] ${name} est CONNECTÉ !`)
                )
                shoukaku.on('error', (name, err) =>
                    console.log(
                        `❌ [LAVALINK] Erreur sur ${name}: ${err.message}`
                    )
                )
                shoukaku.on('debug', (name, info) =>
                    console.log(`🔍 [DEBUG] ${name}: ${info}`)
                )

                // Petit scanner d'état interne
                setInterval(() => {
                    const node = shoukaku.nodes.get('LocalNode')
                    if (node) {
                        console.log(
                            `📡 État actuel du nœud : ${node.state === 1 ? 'CONNECTÉ' : 'DÉCONNECTÉ (Code: ' + node.state + ')'}`
                        )
                    }
                }, 10000)
            } catch (e: any) {
                console.error(
                    '❌ Crash lors de la création de Shoukaku :',
                    e.message
                )
            }
        }, 5000)

        console.log(`🚀 MultiCord est prêt !`)
    }
})
