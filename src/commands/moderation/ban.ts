import {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder,
    ChatInputCommandInteraction
} from 'discord.js'

export default {
    // 1. Définition de la commande
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bannir un membre du serveur')
        .addUserOption((option) =>
            option
                .setName('cible')
                .setDescription('Le membre à bannir')
                .setRequired(true)
        )
        .addStringOption((option) =>
            option.setName('raison').setDescription('La raison du bannissement')
        )
        // Seuls ceux qui ont la permission de bannir peuvent voir/utiliser la commande
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    // 2. Logique de la commande
    async execute(interaction: ChatInputCommandInteraction) {
        const target = interaction.options.getMember('cible')
        const reason =
            interaction.options.getString('raison') ?? 'Aucune raison fournie'

        // Vérification de sécurité
        if (!target || !('ban' in target)) {
            return interaction.reply({
                content:
                    "Je ne peux pas bannir ce membre ou il n'est plus sur le serveur.",
                ephemeral: true
            })
        }

        if (!target.bannable) {
            return interaction.reply({
                content:
                    "Je n'ai pas les permissions nécessaires pour bannir cet utilisateur (mon rôle est peut-être trop bas).",
                ephemeral: true
            })
        }

        // Exécution du bannissement
        await target.ban({ reason })

        // Création d'un bel Embed pour la réponse
        const embed = new EmbedBuilder()
            .setColor(0xff0000) // Rouge
            .setTitle('🔨 Membre banni')
            .addFields(
                { name: 'Utilisateur', value: target.user.tag, inline: true }, // .tag au lieu de ${target}
                {
                    name: 'Modérateur',
                    value: interaction.user.tag,
                    inline: true
                }, // .tag au lieu de ${interaction.user}
                { name: 'Raison', value: reason }
            )
            .setTimestamp()

        return interaction.reply({ embeds: [embed] })
    }
}
