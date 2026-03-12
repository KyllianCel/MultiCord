import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, MessageFlags } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Affiche la liste de toutes les commandes rangées par catégorie'),

    async execute(interaction: ChatInputCommandInteraction) {
        // On récupère toutes les commandes enregistrées dans le client
        const commands = interaction.client.commands;

        const embed = new EmbedBuilder()
            .setColor('#5865F2')
            .setTitle('📚 Centre d\'Aide MultiCord')
            .setDescription('Voici la liste complète des commandes disponibles, classées par module.')
            .setThumbnail(interaction.client.user?.displayAvatarURL() || null)
            .setFooter({ text: `Demandé par ${interaction.user.tag} • ${commands.size} commandes au total` })
            .setTimestamp();

        // Objet pour stocker les commandes par catégorie : { 'modération': ['/ban', '/kick'], 'util': ['/help'] }
        const categories: { [key: string]: string[] } = {};

        commands.forEach((cmd: any) => {
            const catName = cmd.category ? catNameClean(cmd.category) : '⚙️ GÉNÉRAL';
            
            if (!categories[catName]) {
                categories[catName] = [];
            }
            
            categories[catName].push(`**/${cmd.data.name}**\n└ ${cmd.data.description}`);
        });

        // On ajoute chaque catégorie comme un champ dans l'Embed
        for (const [category, cmdList] of Object.entries(categories)) {
            embed.addFields({
                name: category,
                value: cmdList.join('\n'),
                inline: false
            });
        }

        // On répond de façon éphémère (pour ne pas polluer le salon)
        return await interaction.reply({
            embeds: [embed],
            flags: [MessageFlags.Ephemeral]
        });
    },
};

/**
 * Petite fonction utilitaire pour rendre les noms de dossiers plus jolis
 */
function catNameClean(name: string): string {
    const icons: { [key: string]: string } = {
        moderation: '🛡️ MODÉRATION',
        util: '🛠️ UTILITAIRE',
        musique: '🎶 MUSIQUE',
        admin: '👑 ADMINISTRATION'
    };
    
    return icons[name.toLowerCase()] || `📁 ${name.toUpperCase()}`;
}