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
            // 1. Enregistrement dans la base de données via Prisma
            await prisma.warn.create({
                data: {
                    userId: target.id,
                    guildId: guildId,
                    reason: reason,
                    moderatorId: interaction.user.id
                }
            })

            // 2. Tentative d'envoi d'un message privé à l'utilisateur
            try {
                await target.send(
                    `⚠️ Tu as reçu un avertissement sur le serveur **${interaction.guild?.name}**.\n**Raison :** ${reason}`
                )
            } catch {
                console.log('DMs fermés pour cet utilisateur.')
            }

            // 3. Réponse publique avec un Embed
            const embed = new EmbedBuilder()
                .setColor(0xffff00) // Jaune
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
