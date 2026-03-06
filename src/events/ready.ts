import { Events, Client } from 'discord.js'
import Event from '../templates/Event.js'
import { Shoukaku, Connectors } from 'shoukaku'

export default new Event({
    name: Events.ClientReady,
    once: true,
    async execute(client: Client) {
        console.log(`✅ Logged in as ${client.user?.tag}!`)

        // Configuration des Nodes
        const Nodes = [
            {
                name: 'LocalNode',
                url: `${process.env.LAVALINK_HOST || '127.0.0.1'}:${process.env.LAVALINK_PORT || '2333'}`,
                auth: process.env.LAVALINK_PASSWORD || 'youshallnotpass',
                secure: false
            }
        ]

        // Initialisation différée de Shoukaku
        const shoukaku = new Shoukaku(
            new Connectors.DiscordJS(client as any),
            Nodes
        )

        // On attache shoukaku au client pour que les commandes y aient accès
        ;(client as any).shoukaku = shoukaku
        ;(client as any).queues = new Map()

        shoukaku.on('ready', (name) =>
            console.log(`✅ Lavalink Node "${name}" prêt !`)
        )
        shoukaku.on('error', (name, error) =>
            console.error(`❌ Erreur Lavalink sur ${name}:`, error)
        )

        console.log(`🚀 MultiCord est prêt !`)
    }
})
