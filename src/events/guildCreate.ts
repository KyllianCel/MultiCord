import { Events, Guild, EmbedBuilder, TextChannel } from 'discord.js';

export default {
    name: Events.GuildCreate,
    async execute(guild: Guild) {
        // Chercher le premier salon textuel où le bot peut écrire
        const defaultChannel = guild.channels.cache
            .find(c => c.isTextBased() && c.permissionsFor(guild.members.me!).has('SendMessages')) as TextChannel;

        if (defaultChannel) {
            const welcomeEmbed = new EmbedBuilder()
                .setColor(0x3498db)
                .setTitle('🚀 Merci d\'avoir ajouté MultiCord !')
                .setDescription('Pour que je sois pleinement opérationnel, un administrateur doit configurer le salon de logs.')
                .addFields({ name: 'Configuration', value: 'Utilisez la commande `/setup` pour commencer.' })
                .setTimestamp();

            await defaultChannel.send({ embeds: [welcomeEmbed] });
        }
    }
};