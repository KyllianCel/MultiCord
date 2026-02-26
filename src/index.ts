/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import 'dotenv/config'
import { Client, GatewayIntentBits, Collection, Partials } from 'discord.js'
import { readdirSync, lstatSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import type ApplicationCommand from './templates/ApplicationCommand.js'
import type Event from './templates/Event.js'
import type MessageCommand from './templates/MessageCommand.js'
import deployGlobalCommands from './deployGlobalCommands.js'

const { TOKEN } = process.env
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

await deployGlobalCommands()

global.client = Object.assign(
    new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMembers
        ],
        partials: [Partials.Channel]
    }),
    {
        commands: new Collection<string, ApplicationCommand>(),
        msgCommands: new Collection<string, MessageCommand>()
    }
)

// --- Chargement des Slash Commands (Version Dossiers) ---
const commandsPath = path.join(__dirname, 'commands')
const commandItems = readdirSync(commandsPath)

for (const item of commandItems) {
    const itemPath = path.join(commandsPath, item)

    if (lstatSync(itemPath).isDirectory()) {
        const folderFiles = readdirSync(itemPath).filter(
            (file) => file.endsWith('.js') || file.endsWith('.ts')
        )
        for (const file of folderFiles) {
            const filePath = path.join(itemPath, file)
            const command: ApplicationCommand = (
                await import(`file://${filePath}`)
            ).default as ApplicationCommand
            client.commands.set(command.data.name, command)
        }
    } else if (item.endsWith('.js') || item.endsWith('.ts')) {
        const command: ApplicationCommand = (await import(`file://${itemPath}`))
            .default as ApplicationCommand
        client.commands.set(command.data.name, command)
    }
}

// --- Chargement des Message Commands (Prefixe) ---
const msgCommandsPath = path.join(__dirname, 'messageCommands')
const msgCommandFiles = readdirSync(msgCommandsPath).filter(
    (f) => f.endsWith('.js') || f.endsWith('.ts')
)

for (const file of msgCommandFiles) {
    const filePath = path.join(msgCommandsPath, file)
    const command: MessageCommand = (await import(`file://${filePath}`))
        .default as MessageCommand
    client.msgCommands.set(command.name, command)
}

// --- Chargement des Événements ---
const eventsPath = path.join(__dirname, 'events')
const eventFiles = readdirSync(eventsPath).filter(
    (f) => f.endsWith('.js') || f.endsWith('.ts')
)

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file)
    const event: Event = (await import(`file://${filePath}`)).default as Event
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args))
    } else {
        client.on(event.name, (...args) => event.execute(...args))
    }
}

await client.login(TOKEN)
