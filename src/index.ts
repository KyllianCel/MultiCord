/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import 'dotenv/config'
import { Client, GatewayIntentBits, Collection, Partials } from 'discord.js'
import { Player } from 'discord-player'
import { DefaultExtractors } from '@discord-player/extractor'
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

// --- 1. Initialisation du Client ---
global.client = Object.assign(
    new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildVoiceStates // ESSENTIEL pour la musique
        ],
        partials: [Partials.Channel]
    }),
    {
        commands: new Collection<string, ApplicationCommand>(),
        msgCommands: new Collection<string, MessageCommand>()
    }
)

// --- 2. Configuration du Module Musique ---
const player = new Player(client as any, {
    ytdlOptions: {
        quality: 'highestaudio',
        highWaterMark: 1 << 25
    }gi
});

// Chargement des extracteurs (YouTube, Spotify, SoundCloud, etc.)
await player.extractors.loadMulti(DefaultExtractors);

// On rend le player accessible via le client pour tes commandes
(client as any).player = player;

// --- 3. Chargement des Slash Commands ---
const commandsPath = path.join(__dirname, 'commands')
const commandItems = readdirSync(commandsPath)

for (const item of commandItems) {
    const itemPath = path.join(commandsPath, item)
    
    // Si c'est un DOSSIER (ex: moderation, musique, util)
    if (lstatSync(itemPath).isDirectory()) {
        const folderFiles = readdirSync(itemPath).filter(file => file.endsWith('.js') || file.endsWith('.ts'))
        for (const file of folderFiles) {
            const filePath = path.join(itemPath, file)
            const command: any = (await import(`file://${filePath}`)).default
            
            // Catégorie automatique pour le /help
            command.category = item 
            client.commands.set(command.data.name, command)
        }
    } 
    // Si c'est un FICHIER à la racine
    else if (item.endsWith('.js') || item.endsWith('.ts')) {
        const command: any = (await import(`file://${itemPath}`)).default
        command.category = 'Général'
        client.commands.set(command.data.name, command)
    }
}

// --- 4. Chargement des Message Commands ---
const msgCommandsPath = path.join(__dirname, 'messageCommands')
const msgCommandFiles = readdirSync(msgCommandsPath).filter(f => f.endsWith('.js') || f.endsWith('.ts'))

for (const file of msgCommandFiles) {
    const filePath = path.join(msgCommandsPath, file)
    const command: MessageCommand = (await import(`file://${filePath}`)).default as MessageCommand
    client.msgCommands.set(command.name, command)
}

// --- 5. Chargement des Événements Discord ---
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

// --- 6. Événements Spéciaux du Player (Musique) ---
// On peut ajouter ici des logs quand une musique commence
player.events.on('playerStart', (queue, track) => {
    // On récupère l'interaction stockée dans metadata
    const interaction = queue.metadata as ChatInputCommandInteraction;
    // On envoie le message dans le salon où la commande a été tapée
    interaction.channel?.send(`🎶 En train de jouer : **${track.title}**`);
});

player.events.on('error', (queue, error) => {
    console.error(`[Erreur Player] ${error.message}`);
});

// --- 7. Lancement du bot ---
await client.login(TOKEN)

if (process.argv.includes('--deploy')) {
    deployGlobalCommands().catch(err => console.error("❌ Erreur déploiement:", err));
}