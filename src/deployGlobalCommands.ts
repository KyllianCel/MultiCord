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

    if (!TOKEN || !CLIENT_ID) {
        console.error('❌ Erreur : TOKEN, CLIENT_ID manquant dans le .env')
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
        console.log(`⏳ Discord : Déploiement global de ${commands.length} commandes...`)
        
        await rest.put(
            Routes.applicationCommands(CLIENT_ID), 
            { body: commands }
        )
        
        console.log('✅ Discord : Commandes enregistrées sur le serveur !')
    } catch (error: any) {
        console.error('❌ Discord : La requête a échoué !')
        console.error(error.message)
    }
}