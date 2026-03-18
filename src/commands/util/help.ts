import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, MessageFlags } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Affiche la liste de toutes les commandes rangées par catégorie'),

    async execute(interaction: ChatInputCommandInteraction) {
        // On récupère toutes les commandes enregistrées dans le client
        const commands = (interaction.client as any).commands;

        const embed = new EmbedBuilder()
            .setColor('#5865F2')
            .setTitle('📚 Centre d\'Aide MultiCord')
            .setDescription('Voici la liste complète des commandes disponibles, classées par module.')
            .setThumbnail(interaction.client.user?.displayAvatarURL() || null)
            .setFooter({ text: `Demandé par ${interaction.user.tag} • ${commands.size} commandes au total` })
            .setTimestamp();

        const categories: { [key: string]: string[] } = {};

        commands.forEach((cmd: any) => {
            const catName = cmd.category ? catNameClean(cmd.category) : '⚙️ GÉNÉRAL';
            
            if (!categories[catName]) {
                categories[catName] = [];
            }
            
            categories[catName].push(`**/${cmd.data.name}**\n└ ${cmd.data.description}`);
        });

        for (const [category, cmdList] of Object.entries(categories)) {
            embed.addFields({
                name: category,
                value: cmdList.join('\n'),
                inline: false
            });
        }

        return await interaction.reply({
            embeds: [embed],
            flags: [MessageFlags.Ephemeral]
        });
    },
};


function catNameClean(name: string): string {
    const icons: { [key: string]: string } = {
        moderation: '🛡️ MODÉRATION',
        util: '🛠️ UTILITAIRE',
        musique: '🎶 MUSIQUE',
    };
    
    return icons[name.toLowerCase()] || `📁 ${name.toUpperCase()}`;
}