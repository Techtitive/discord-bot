const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Replies bot commands and information.'),
    async execute (interaction) {

        const avatar = interaction.user.displayAvatarURL({ dynamic: true });

        const embed1 = {
            color: 0xff7700,
            title: 'Commands',
            author: {
                name: 'Help',
                icon_url: avatar,
            },
            description: 'A multipurpose bot.',
            fields: [
                { name: '**Slash Commands**', value: 'These commands use `/` and are available for all users except moderation commands:', inline: false },
                { name: '`/ban`', value: '**Moderation**: Used to ban users.', inline: true },
                { name: '`/unban`', value: '**Moderation**: Used to unban users.', inline: true },
                { name: '`/kick`', value: '**Moderation**: Used to kick users.', inline: true },
                { name: '`/info user`', value: '**Information**: Retrieve user info.', inline: true },
                { name: '`/info server`', value: '**Information**: Retrieve server info.', inline: true },
                { name: '`/website`', value: '**Information**: Get website info.', inline: true },
                { name: '`/channel`', value: '**Information**: Get channel info.', inline: true },
                { name: '`/dm`', value: '**Community**: Send DMs through the bot.', inline: true },
                { name: '`/send-user`', value: '**Community**: Message a user via bot.', inline: true },
                { name: '`/send-channel`', value: '**Community**: Message a channel via bot.', inline: true },
                { name: '`/help`', value: '**Community**: Get help with the bot.', inline: true },

                { name: '**Prefix Commands**', value: 'These commands use `!` and require specific permissions:', inline: false },
                { name: '`!ban`', value: '**Moderation**: Used to ban users.', inline: true },
                { name: '`!unban`', value: '**Moderation**: Used to unban users.', inline: true },
                { name: '`!help`', value: '**Community**: Get help with the bot.', inline: true },
            ],
        }

        const button1 = new ButtonBuilder()
            .setLabel('Channel')
            .setURL('https://www.youtube.com/@Techtitive')
            .setStyle(ButtonStyle.Link)

        const button2 = new ButtonBuilder()
            .setLabel('Website')
            .setURL('https://techtitive.github.io/website')
            .setStyle(ButtonStyle.Link)

        const row = new ActionRowBuilder()
            .addComponents(button1, button2);

        await interaction.reply({embeds: [embed1], components: [row]});
    }
}