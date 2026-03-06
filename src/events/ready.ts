import { Events, Client } from 'discord.js'
import Event from '../templates/Event.js'

export default new Event({
    name: Events.ClientReady,
    once: true,
    execute(client: Client): void {
        console.log(`Logged in as ${client.user?.tag as string}!`)
    }
})
