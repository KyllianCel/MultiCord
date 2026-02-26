import type MessageCommand from '../templates/MessageCommand.js'
import Event from '../templates/Event.js'
import { Events, Message } from 'discord.js'
import { createRequire } from 'module'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const require = createRequire(import.meta.url)

interface Config {
    prefix: string
    token: string
    clientId: string
}

// On remonte de DEUX niveaux pour trouver le config.json dans dist/
const config = require(path.join(__dirname, '../../config.json')) as Config

export default new Event({
    name: Events.MessageCreate,
    async execute(message: Message): Promise<void> {
        // ! Message content is a priviliged intent now!

        // Handles non-slash commands, only recommended for deploy commands

        // filters out bots and non-prefixed messages
        if (!message.content.startsWith(config.prefix) || message.author.bot)
            return

        // fetches the application owner for the bot
        if (!client.application?.owner) await client.application?.fetch()

        // get the arguments and the actual command name for the inputted command
        const args = message.content
            .slice(config.prefix.length)
            .trim()
            .split(/ +/)
        const commandName = (<string>args.shift()).toLowerCase()

        const command =
            (client.msgCommands.get(commandName) as MessageCommand) ||
            (client.msgCommands.find(
                (cmd: MessageCommand): boolean =>
                    cmd.aliases && cmd.aliases.includes(commandName)
            ) as MessageCommand)

        // dynamic command handling
        if (!command) return

        try {
            await command.execute(message, args)
        } catch (error) {
            console.error(error)
        }
    }
})
