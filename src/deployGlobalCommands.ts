/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { REST } from '@discordjs/rest'
import { RESTPostAPIApplicationCommandsJSONBody, Routes } from 'discord.js'
import { readdirSync } from 'fs'
import path from 'path' // Ajouté
import { fileURLToPath } from 'url' // Ajouté
import type ApplicationCommand from './templates/ApplicationCommand.js'

// Configuration pour récupérer le chemin du dossier actuel en ESM
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

    // On pointe vers le dossier 'commands' qui est dans le même dossier que ce fichier
    const commandsPath = path.join(__dirname, 'commands')

    // On lit le dossier avec le chemin absolu
    const commandFiles = readdirSync(commandsPath).filter(
        (file) => file.endsWith('.js') || file.endsWith('.ts')
    )

    for (const file of commandFiles) {
        // Importation dynamique en utilisant le chemin absolu
        // Note: On utilise path.join pour être compatible Windows/Linux
        const filePath = path.join(commandsPath, file)
        const command: ApplicationCommand = (await import(`file://${filePath}`))
            .default as ApplicationCommand

        const commandData = command.data.toJSON()
        commands.push(commandData)
    }

    const rest = new REST({ version: '10' }).setToken(TOKEN)

    try {
        console.log('Started refreshing application (/) commands.')

        // On vide d'abord (optionnel mais propre)
        await rest.put(Routes.applicationCommands(CLIENT_ID), {
            body: []
        })

        // On déploie les nouvelles commandes
        await rest.put(Routes.applicationCommands(CLIENT_ID), {
            body: commands
        })

        console.log('Successfully reloaded application (/) commands.')
    } catch (error) {
        console.error('Erreur lors du déploiement des commandes :', error)
    }
}
