import MessageCommand from '../templates/MessageCommand.js'
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

const config = require(path.join(__dirname, '../../config.json')) as Config
const { OWNER_ID } = process.env

export default new MessageCommand({
    name: 'undeploy',
    description: 'Undeploys the slash commands',
    async execute(message, args): Promise<void> {
        if (message.author.id !== OWNER_ID) return

        if (!args[0]) {
            await message.reply(
                `Incorrect number of arguments! The correct format is \`${config.prefix}undeploy <guild/global>\``
            )
            return
        }

        if (args[0].toLowerCase() === 'global') {
            // global undeployment

            // undeploy the commands
            await client.application?.commands.set([])

            await message.reply({ content: 'Undeploying!' })
        } else if (args[0].toLowerCase() === 'guild') {
            // guild deployment

            // undeploy the commands
            await message.guild?.commands.set([])

            await message.reply({ content: 'Undeploying!' })
        }
    }
})
