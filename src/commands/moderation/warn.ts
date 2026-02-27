import {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder,
    ChatInputCommandInteraction
} from 'discord.js'
import prisma from '../../database.js'
import { MessageFlags } from 'discord.js'

export default {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription("Avertir un membre et enregistrer l'infraction")
        .addUserOption((option) =>
            option
                .setName('cible')
                .setDescription('Le membre à avertir')
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName('raison')
                .setDescription("La raison de l'avertissement")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

    async execute(interaction: ChatInputCommandInteraction) {
        const target = interaction.options.getUser('cible')!
        const reason = interaction.options.getString('raison')!
        const guildId = interaction.guildId!

        try {
            // 1. Enregistrement Base de données
            await prisma.warn.create({
                data: {
                    userId: target.id,
                    guildId: guildId,
                    reason: reason,
                    moderatorId: interaction.user.id
                }
            })

            // 2. Création de l'Embed (Déclaration AVANT utilisation)
            const embed = new EmbedBuilder()
                .setColor(0xffff00)
                .setTitle('⚠️ Avertissement enregistré')
                .addFields(
                    { name: 'Utilisateur', value: target.tag, inline: true },
                    {
                        name: 'Modérateur',
                        value: interaction.user.tag,
                        inline: true
                    },
                    { name: 'Raison', value: reason }
                )
                .setTimestamp()

            // 3. LOGS (Point 2) - On utilise l'embed ici
            const logChannelId = process.env.LOG_CHANNEL_ID
            if (logChannelId) {
                const logChannel =
                    interaction.guild?.channels.cache.get(logChannelId)
                if (logChannel?.isTextBased()) {
                    await logChannel.send({ embeds: [embed] })
                }
            }

            // 4. Message Privé (DM)
            try {
                await target.send(
                    `⚠️ Tu as reçu un warn sur **${interaction.guild?.name}** pour : ${reason}`
                )
            } catch {
                console.log('DMs fermés.')
            }

            // 5. Réponse à l'interaction
            return interaction.reply({ embeds: [embed] })
        } catch (error: any) {
            console.error(error)
            return interaction.reply({
                content: `Une erreur est survenue lors de l'enregistrement du warn dans la base de données.`,
                flags: [MessageFlags.Ephemeral]
            })
        }
    }
}
