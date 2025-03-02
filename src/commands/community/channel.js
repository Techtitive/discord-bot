const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('channel')
    .setDescription('Replies with channel information!'),
    async execute (interaction) {

        const avatar = interaction.user.displayAvatarURL({ dynamic: true });

        const embed1 = {
            color: 0xff7700,
            title: 'Channel',
            url: 'https://www.youtube.com/@Techtitive',
            author: {
                name: 'Techtitive',
                icon_url: avatar,
                url: 'https://www.youtube.com/@Techtitive',
            },
            description: 'A channel that is dedicated to providing you with the best tech content!',
            thumbnail: {
                url: 'https://yt3.googleusercontent.com/Zv4KxB3lWLPHuLzQBE8yRCmJ7dJ-x84PK-UcgqxwkvpSR_XJaMGH5Vw0X9YXqWkg7C6igN4uFw=s1920-c-k-c0x00ffffff-no-rj',
            },
            image: {
                url: 'https://yt3.googleusercontent.com/UhQd2_20s0dNNkUnDo_6sN1Gd83edlkcGBkn3ORLXUHz4yIBvPKjwXqdy4mJeJd3-zwISP6C=w2120-fcrop64=1,00000000ffffffff-k-c0xffffffff-no-nd-rj',
            },
        }

        const button = new ButtonBuilder()
            .setLabel('Channel')
            .setURL('https://www.youtube.com/@Techtitive')
            .setStyle(ButtonStyle.Link)

        const row = new ActionRowBuilder()
            .addComponents(button);

        await interaction.reply({embeds: [embed1], components: [row]});
    }
}