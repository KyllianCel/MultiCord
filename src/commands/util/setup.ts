import {
    SlashCommandBuilder,
    PermissionFlagsBits,
    ChannelType,
    ChatInputCommandInteraction,
    MessageFlags
} from 'discord.js'
import { prisma } from '../../database.js'

export default {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Configurer les paramètres du bot pour ce serveur')
        .addChannelOption((option) =>
            option
                .setName('logs')
                .setDescription('Le salon où envoyer les logs de modération')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction: ChatInputCommandInteraction) {
        const logChannel = interaction.options.getChannel('logs')!
        const guildId = interaction.guildId!

        // "Upsert" : Met à jour si ça existe, sinon crée l'entrée
        await prisma.guildConfig.upsert({
            where: { guildId: guildId },
            update: { logChannelId: logChannel.id },
            create: {
                guildId: guildId,
                logChannelId: logChannel.id
            }
        })

        return interaction.reply({
            content: `✅ Configuration mise à jour ! Les logs seront désormais envoyés dans <#${logChannel.id}>.`,
            flags: [MessageFlags.Ephemeral]
        })
    }
}
