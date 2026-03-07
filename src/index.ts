import 'dotenv/config'
import { Client, GatewayIntentBits, Collection, Partials } from 'discord.js'
import { readdirSync, lstatSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import type ApplicationCommand from './templates/ApplicationCommand.js'
import Event from './templates/Event.js'
import type MessageCommand from './templates/MessageCommand.js'

const { TOKEN } = process.env
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// --- 1. Client ---
export const client = Object.assign(
    new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent
        ],
        partials: [Partials.Channel]
    }),
    {
        commands: new Collection<string, ApplicationCommand>(),
        msgCommands: new Collection<string, MessageCommand>()
    }
)

// --- 2. Lavalink ---
//changé dans ready

// --- 3. Loader (Commands & Events) ---
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

            try {
                const imported = await import(`file://${filePath}`)
                const command = imported.default

                if (!command || !command.data || !command.data.name) continue

                command.category = item
                client.commands.set(command.data.name, command)
                console.log(`✅ Commande chargée : ${command.data.name}`)
            } catch (error) {
                console.error(
                    `❌ Erreur lors du chargement de ${file} :`,
                    error
                )
            }
        }
    }
}

const eventsPath = path.join(__dirname, 'events')
const eventFiles = readdirSync(eventsPath).filter(
    (f) => f.endsWith('.js') || f.endsWith('.ts')
)
for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file)
    const event: Event = (await import(`file://${filePath}`)).default as Event
    if (event.once) client.once(event.name, (...args) => event.execute(...args))
    else client.on(event.name, (...args) => event.execute(...args))
}

// --- 4. Login ---
await client.login(TOKEN)

import { Events, Interaction } from 'discord.js'

export default new Event({
    name: Events.InteractionCreate,
    async execute(interaction: Interaction) {
        try {
            if (interaction.isChatInputCommand()) {
                const command = (interaction.client as any).commands.get(
                    interaction.commandName
                )
                if (!command) return
                await command.execute(interaction)
            } else if (interaction.isAutocomplete()) {
                const command = (interaction.client as any).commands.get(
                    interaction.commandName
                )
                if (!command || !command.autocomplete) return
                await command.autocomplete(interaction)
            }
        } catch (error: any) {
            // On ignore l'erreur 10062 (Unknown Interaction) qui est juste un problème de délai
            if (error.code === 10062) return
            console.error('❌ Erreur Interaction:', error)
        }
    }
})

if (process.argv.includes('--deploy')) {
    const { default: deployGlobalCommands } =
        await import('./deployGlobalCommands.js')
    await deployGlobalCommands()
}
