import {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder,
    ChatInputCommandInteraction,
    GuildMember
} from 'discord.js'
import { prisma } from '../../database.js'

export default {
    data: new SlashCommandBuilder()
        .setName('warnings')
        .setDescription("Afficher la liste des avertissements d'un membre")
        .addUserOption((option) =>
            option
                .setName('cible')
                .setDescription('Le membre dont vous voulez voir les warns')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

    async execute(interaction: ChatInputCommandInteraction) {
        const target = interaction.options.getMember('cible') as GuildMember

        if (!target) {
            return interaction.reply({
                content: 'Utilisateur introuvable.',
                ephemeral: true
            })
        }

        // Récupération des avertissements dans la base de données
        const userWarns = await prisma.warn.findMany({
            where: {
                userId: target.id,
                guildId: interaction.guildId!
            },
            orderBy: {
                createdAt: 'desc' // Les plus récents en premier
            }
        })

        // Cas où l'utilisateur n'a aucun avertissement
        if (userWarns.length === 0) {
            return interaction.reply({
                content: `✅ **${target.user.tag}** n'a aucun avertissement dans la base de données.`,
                ephemeral: false
            })
        }

        // Création de l'Embed pour afficher la liste
        const embed = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle(`Liste des avertissements - ${target.user.tag}`)
            .setThumbnail(target.user.displayAvatarURL())
            .setDescription(
                `Cet utilisateur possède **${userWarns.length}** avertissement(s).`
            )
            .setTimestamp()

        // On ajoute chaque warn dans l'embed (limité aux 25 derniers pour éviter les erreurs d'Embed)
        userWarns.slice(0, 25).forEach((warn: any) => {
            embed.addFields({
                name: `Warn #${warn.id} - ${warn.createdAt.toLocaleDateString()}`,
                value: `**Raison :** ${warn.reason}\n**Modérateur :** <@${warn.moderatorId}>`
            })
        })

        return interaction.reply({ embeds: [embed] })
    }
}
