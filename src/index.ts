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

// 1. Initialisation du client
global.client = Object.assign(
    new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildVoiceStates // Ajouté pour la musique plus tard
        ],
        partials: [Partials.Channel]
    }),
    {
        commands: new Collection<string, ApplicationCommand>(),
        msgCommands: new Collection<string, MessageCommand>()
    }
)

// --- Chargement des Slash Commands ---
const commandsPath = path.join(__dirname, 'commands')
const commandItems = readdirSync(commandsPath)

for (const item of commandItems) {
    const itemPath = path.join(commandsPath, item)
    
    // Si c'est un DOSSIER (ex: moderation, util)
    if (lstatSync(itemPath).isDirectory()) {
        const folderFiles = readdirSync(itemPath).filter(file => file.endsWith('.js') || file.endsWith('.ts'))
        for (const file of folderFiles) {
            const filePath = path.join(itemPath, file)
            const command: any = (await import(`file://${filePath}`)).default
            
            // On définit la catégorie selon le nom du dossier
            command.category = item 
            
            client.commands.set(command.data.name, command)
        }
    } 
    // Si c'est un FICHIER à la racine de /commands
    else if (item.endsWith('.js') || item.endsWith('.ts')) {
        const command: any = (await import(`file://${itemPath}`)).default
        
        // Catégorie par défaut
        command.category = 'Général'
        
        client.commands.set(command.data.name, command)
    }
}

// --- Le reste du fichier (Events, Login, etc.) reste inchangé ---
const eventsPath = path.join(__dirname, 'events')
const eventFiles = readdirSync(eventsPath).filter(f => f.endsWith('.js') || f.endsWith('.ts'))

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

if (process.argv.includes('--deploy')) {
    deployGlobalCommands().catch(err => console.error("❌ Erreur déploiement:", err));
}