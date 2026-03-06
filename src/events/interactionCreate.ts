import { Events, Interaction } from 'discord.js'
import Event from '../templates/Event.js'

export default new Event({
    name: Events.InteractionCreate,
    async execute(interaction: Interaction) {
        try {
            if (interaction.isChatInputCommand()) {
                const command = (interaction.client as any).commands.get(
                    interaction.commandName
                )
                if (!command) return
                await command.execute(interaction)
            } else if (interaction.isAutocomplete()) {
                const command = (interaction.client as any).commands.get(
                    interaction.commandName
                )
                if (!command || !command.autocomplete) return
                await command.autocomplete(interaction)
            }
        } catch (error: any) {
            if (error.code === 10062) return
            console.error('❌ Erreur Interaction:', error)
        }
    }
})
