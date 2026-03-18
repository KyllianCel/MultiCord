import { readdirSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import type ApplicationCommand from '../templates/ApplicationCommand.js'
import MessageCommand from '../templates/MessageCommand.js'
import { REST } from '@discordjs/rest'
import { RESTPostAPIApplicationCommandsJSONBody, Routes } from 'discord.js'
import { createRequire } from 'module'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const require = createRequire(import.meta.url)

interface Config {
    prefix: string
    token: string
    clientId: string
}

const config = require(path.join(__dirname, '../../config.json')) as Config

export default new MessageCommand({
    name: 'deploy',
    description: 'Deploys the slash commands',
    async execute(message, args): Promise<void> {
        // On récupère les variables du .env au moment de l'exécution
        const { TOKEN, CLIENT_ID, OWNER_ID } = process.env

        if (message.author.id !== OWNER_ID) return

        if (!args[0]) {
            await message.reply({
                content: `Incorrect number of arguments! The correct format is \`${config.prefix}deploy <guild/global>\``
            })
            return
        }

        // On définit le chemin absolu vers le dossier des commandes slash
        const commandsPath = path.join(__dirname, '..', 'commands')

        if (
            args[0].toLowerCase() === 'global' ||
            args[0].toLowerCase() === 'guild'
        ) {
            console.log(`Deploying commands by ${message.author.tag}!`)

            const commands: RESTPostAPIApplicationCommandsJSONBody[] = []
            const commandFiles: string[] = readdirSync(commandsPath).filter(
                (file) => file.endsWith('.js') || file.endsWith('.ts')
            )

            for (const file of commandFiles) {
                const filePath = path.join(commandsPath, file)
                const command: ApplicationCommand = (
                    await import(`file://${filePath}`)
                ).default as ApplicationCommand
                const commandData = command.data.toJSON()
                commands.push(commandData)
            }

            const rest = new REST({ version: '10' }).setToken(TOKEN as string)

            try {
                console.log('Started refreshing application (/) commands.')

                if (args[0].toLowerCase() === 'global') {
                    await rest.put(
                        Routes.applicationCommands(CLIENT_ID as string),
                        {
                            body: commands
                        }
                    )
                } else {
                    await rest.put(
                        Routes.applicationGuildCommands(
                            CLIENT_ID as string,
                            message.guild?.id as string
                        ),
                        { body: commands }
                    )
                }

                console.log('Successfully reloaded application (/) commands.')
                await message.reply({
                    content: `Successfully deployed ${args[0]}!`
                })
            } catch (error) {
                console.error(error)
                await message.reply({ content: 'Failed to deploy commands.' })
            }
        }
    }
})
