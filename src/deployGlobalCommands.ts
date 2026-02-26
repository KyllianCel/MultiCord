/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { REST } from '@discordjs/rest'
import { RESTPostAPIApplicationCommandsJSONBody, Routes } from 'discord.js'
import { readdirSync, lstatSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import type ApplicationCommand from './templates/ApplicationCommand.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default async function deployGlobalCommands() {
    const TOKEN = process.env.TOKEN
    const CLIENT_ID = process.env.CLIENT_ID

    if (!TOKEN || !CLIENT_ID) {
        console.error('Erreur : TOKEN ou CLIENT_ID manquant dans le .env')
        return
    }

    const commands: RESTPostAPIApplicationCommandsJSONBody[] = []
    const commandsPath = path.join(__dirname, 'commands')

    // 1. On récupère tout ce qu'il y a dans le dossier 'commands' (fichiers et dossiers)
    const commandItems = readdirSync(commandsPath)

    for (const item of commandItems) {
        const itemPath = path.join(commandsPath, item)

        // 2. Si c'est un dossier (ex: moderation)
        if (lstatSync(itemPath).isDirectory()) {
            const folderFiles = readdirSync(itemPath).filter(
                (file) => file.endsWith('.js') || file.endsWith('.ts')
            )
            for (const file of folderFiles) {
                const filePath = path.join(itemPath, file)
                const command: ApplicationCommand = (
                    await import(`file://${filePath}`)
                ).default as ApplicationCommand
                commands.push(command.data.toJSON())
            }
        }
        // 3. Si c'est un fichier directement à la racine de 'commands'
        else if (item.endsWith('.js') || item.endsWith('.ts')) {
            const command: ApplicationCommand = (
                await import(`file://${itemPath}`)
            ).default as ApplicationCommand
            commands.push(command.data.toJSON())
        }
    }

    const rest = new REST({ version: '10' }).setToken(TOKEN)

    try {
        console.log('Started refreshing application (/) commands.')
        await rest.put(Routes.applicationCommands(CLIENT_ID), { body: [] })
        await rest.put(Routes.applicationCommands(CLIENT_ID), {
            body: commands
        })
        console.log('Successfully reloaded application (/) commands.')
    } catch (error) {
        console.error('Erreur lors du déploiement des commandes :', error)
    }
}
