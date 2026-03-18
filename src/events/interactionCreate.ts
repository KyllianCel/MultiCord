import { BaseInteraction, Events } from 'discord.js'
import Event from '../templates/Event.js'

export default new Event({
    name: Events.InteractionCreate,
    async execute(interaction: BaseInteraction): Promise<void> {
        const client = interaction.client as any;

        // gestion de l'autocomplétion
        if (interaction.isAutocomplete()) {
            const command = client.commands.get(interaction.commandName);
            if (!command || !command.autocomplete) return;

            try {
                await command.autocomplete(interaction);
            } catch (error) {
                console.error("❌ Erreur Autocomplete:", error);
            }
            return; // On s'arrête ici pour une interaction d'autocomplétion
        }

        // gestion des commandes slash
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return;

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                const msg = { content: 'Une erreur est survenue !', ephemeral: true };
                if (interaction.deferred || interaction.replied) await interaction.followUp(msg);
                else await interaction.reply(msg);
            }
        }
    }
})