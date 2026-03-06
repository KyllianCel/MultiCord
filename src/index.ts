/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import 'dotenv/config'
import { Client, GatewayIntentBits, Collection, Partials} from 'discord.js'
import { Shoukaku, Connectors } from 'shoukaku'
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

// --- 1. Client ---
global.client = Object.assign(
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
const Nodes = [{
    name: 'LocalNode',
    url: 'localhost:2333',
    auth: 'youshallnotpass'
}];

const shoukaku = new Shoukaku(new Connectors.DiscordJS(client), Nodes);
(client as any).shoukaku = shoukaku;
(client as any).queues = new Map();

shoukaku.on('ready', (name) => console.log(`✅ Lavalink Node "${name}" prêt !`));
shoukaku.on('error', (name, error) => console.error(`❌ Erreur Lavalink:`, error));

// --- 3. Loader (Commands & Events) ---
const commandsPath = path.join(__dirname, 'commands')
const commandItems = readdirSync(commandsPath)

for (const item of commandItems) {
    const itemPath = path.join(commandsPath, item)
    if (lstatSync(itemPath).isDirectory()) {
        const folderFiles = readdirSync(itemPath).filter(file => file.endsWith('.js') || file.endsWith('.ts'))
        
        for (const file of folderFiles) {
            const filePath = path.join(itemPath, file)
            
            try {
                const imported = await import(`file://${filePath}`)
                const command = imported.default

                // Vérification de sécurité
                if (!command || !command.data || !command.data.name) {
                    console.warn(`⚠️ Le fichier "${file}" dans "${item}" n'est pas une commande valide (export default ou data.name manquant).`)
                    continue
                }

                command.category = item 
                client.commands.set(command.data.name, command)
                console.log(`✅ Commande chargée : ${command.data.name}`) 
                
            } catch (error) {
                console.error(`❌ Erreur lors du chargement de ${file} :`, error)
            }
        }
    }
}

const eventsPath = path.join(__dirname, 'events')
const eventFiles = readdirSync(eventsPath).filter(f => f.endsWith('.js') || f.endsWith('.ts'))
for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file)
    const event: Event = (await import(`file://${filePath}`)).default as Event
    if (event.once) client.once(event.name, (...args) => event.execute(...args))
    else client.on(event.name, (...args) => event.execute(...args))
}

// --- 4. Login ---
await client.login(TOKEN)
if (process.argv.includes('--deploy')) {
    const { default: deployGlobalCommands } = await import('./deployGlobalCommands.js');
    await deployGlobalCommands();
}