/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { REST } from '@discordjs/rest'
import { RESTPostAPIApplicationCommandsJSONBody, Routes } from 'discord.js'
import { readdirSync, lstatSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default async function deployGlobalCommands() {
    const TOKEN = process.env.TOKEN
    const CLIENT_ID = process.env.CLIENT_ID
    const GUILD_ID = process.env.GUILD_ID // On récupère le nouvel ID

    if (!TOKEN || !CLIENT_ID || !GUILD_ID) {
        console.error('❌ Erreur : TOKEN, CLIENT_ID ou GUILD_ID manquant dans le .env')
        return
    }

    const commands: RESTPostAPIApplicationCommandsJSONBody[] = []
    const commandsPath = path.join(__dirname, 'commands')

    // Chargement simplifié pour le test
    const commandItems = readdirSync(commandsPath)
    for (const item of commandItems) {
        const itemPath = path.join(commandsPath, item)
        if (lstatSync(itemPath).isDirectory()) {
            const folderFiles = readdirSync(itemPath).filter(f => f.endsWith('.js') || f.endsWith('.ts'))
            for (const file of folderFiles) {
                const command = (await import(`file://${path.join(itemPath, file)}`)).default
                if (command?.data) commands.push(command.data.toJSON())
            }
        } else if (item.endsWith('.js') || item.endsWith('.ts')) {
            const command = (await import(`file://${itemPath}`)).default
            if (command?.data) commands.push(command.data.toJSON())
        }
    }

    const rest = new REST({ version: '10' }).setToken(TOKEN)

    try {
        console.log(`⏳ Discord : Envoi de ${commands.length} commandes au serveur ${GUILD_ID}...`)
        
        // --- CHANGEMENT ICI : On utilise applicationGuildCommands au lieu de applicationCommands ---
        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), 
            { body: commands }
        )
        
        console.log('✅ Discord : Commandes enregistrées sur le serveur !')
    } catch (error: any) {
        console.error('❌ Discord : La requête a échoué !')
        console.error(error.message)
    }
}