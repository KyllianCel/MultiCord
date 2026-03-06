import { 
    SlashCommandBuilder, 
    PermissionFlagsBits, 
    EmbedBuilder, 
    ChatInputCommandInteraction 
} from 'discord.js';
import prisma from '../../database.js';

export default {
    data: new SlashCommandBuilder()
        .setName('settings')
        .setDescription('Afficher la configuration actuelle du bot sur ce serveur')
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

    async execute(interaction: ChatInputCommandInteraction) {
        const guildId = interaction.guildId!;

        // 1. Récupération de la configuration en base de données
        const config = await prisma.guildConfig.findUnique({
            where: { guildId: guildId }
        });

        // 2. Vérification de l'existence du salon de logs dans le cache Discord
        const logChannel = config?.logChannelId 
            ? interaction.guild?.channels.cache.get(config.logChannelId) 
            : null;

        const embed = new EmbedBuilder()
            .setColor(0x3498db)
            .setTitle(`⚙️ Configuration de ${interaction.guild?.name}`)
            .setThumbnail(interaction.guild?.iconURL() || null)
            .addFields(
                { 
                    name: '📢 Salon de Logs', 
                    value: logChannel ? `<#${logChannel.id}>` : '❌ *Non configuré (utilisez `/setup`)*', 
                    inline: true 
                },
                { 
                    name: '🤖 État du Bot', 
                    value: '✅ En ligne', 
                    inline: true 
                },
                {
                    name: '📊 Base de données',
                    value: '🗄️ SQLite (LibSQL)',
                    inline: false
                }
            )
            .setFooter({ text: 'MultiCord - Système de gestion' })
            .setTimestamp();

        return interaction.reply({ embeds: [embed], ephemeral: true });
    }
};