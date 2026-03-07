import 'dotenv/config'
import { Client, GatewayIntentBits, Collection, Partials } from 'discord.js'
import { readdirSync, lstatSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import type ApplicationCommand from './templates/ApplicationCommand.js'
import type Event from './templates/Event.js'
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

import { Events } from 'discord.js'
import { Shoukaku, Connectors } from 'shoukaku'

// Utilise 'clientReady' au lieu de 'ready' pour éviter le Warning
client.once(Events.ClientReady, (readyClient) => {
    console.log(
        `✅ Bot connecté : ${readyClient.user.tag} (${readyClient.user.id})`
    )

    const host = (process.env.LAVALINK_HOST || '127.0.0.1').trim()
    const port = (process.env.LAVALINK_PORT || '2333').trim()
    const password = (process.env.LAVALINK_PASSWORD || 'youshallnotpass').trim()

    const Nodes = [
        {
            name: 'LocalNode',
            url: `${host}:${port}`,
            auth: password,
            secure: false
        }
    ]

    // On initialise Shoukaku APRÈS s'être assuré que le client est prêt
    const shoukaku = new Shoukaku(
        new Connectors.DiscordJS(readyClient),
        Nodes,
        {
            moveOnDisconnect: true,
            resume: false, // DÉSACTIVE le resume pour le debug, c'est souvent ça qui cause le code 1000
            reconnectTries: 5,
            reconnectInterval: 5
        }
    )

    ;(readyClient as any).shoukaku = shoukaku
    ;(readyClient as any).queues = new Map()

    shoukaku.on('ready', (name) =>
        console.log(`⭐ [LAVALINK] ${name} est enfin OPÉRATIONNEL !`)
    )
    shoukaku.on('error', (name, err) =>
        console.log(`❌ [LAVALINK] Erreur sur ${name}: ${err.message}`)
    )

    // Log de debug pour voir le passage des étapes
    shoukaku.on('debug', (name, info) => {
        if (info.includes('Session')) console.log(`🔍 [SESSION] ${info}`)
    })
})

if (process.argv.includes('--deploy')) {
    const { default: deployGlobalCommands } =
        await import('./deployGlobalCommands.js')
    await deployGlobalCommands()
}
