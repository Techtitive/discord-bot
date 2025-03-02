const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { Timestamp } = require('firebase-admin/firestore');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('website')
    .setDescription('Replies with website information!'),
    async execute (interaction) {

        const avatar = interaction.user.displayAvatarURL({ dynamic: true });

        const embed1 = {
            color: 0xff7700,
            title: 'Website',
            url: 'https://techtitive.github.io/website/',
            author:{
                name: 'Techtitive',
                icon_url: avatar,
                url: 'https://techtitive.github.io/website/',
            },
            description: 'A website that is a collection of all the projects that we have worked on!',
            fields: [
                {
                    name: '🧮 Calculator',
                    value: 'A simple calculator that can perform basic arithmetic operations!',
                },
                {
                    name: '📖 Dictionary',
                    value: 'A dictionary that can provide you with the meaning of a word!',
                },
                {
                    name: '🔢 Counter',
                    value: 'A counter that can keep track of the number of times a button is clicked!',
                },
                {
                    name: '🌦️ Weather',
                    value: 'A weather app that can provide you with the weather of a city!',
                },
                {
                    name: '🐉 Pokémon',
                    value: 'A Pokémon app that can provide you with the details of a Pokémon!',
                },
                {
                    name: '🎴 Card Generator',
                    value: 'A card generator that can provide you with a greeting cards like birthday, anniversary, etc!',
                },
                {
                    name: '🧩 Riddles',
                    value: 'A riddle app that can provide you with random riddles to solve!',
                },
                {
                    name: '🔗 Barcode',
                    value: 'A barcode generator that can provide you with a barcode of any text!',
                },
                {
                    name: '🌌 Space Morpher',
                    value: 'A space morpher app that can provide you with a space themed game!',
                },
                {
                    name: '🐍 Snake',
                    value: 'A snake game that can provide you with a snake game to play!',
                },
                {
                    name: '❗ Quotes',
                    value: 'A quotes app that can provide you with random quotes!',
                }
            ],

        footer: {
            text: 'Visit the website to explore more!',
        }
        }

        const button = new ButtonBuilder()
        .setLabel('Website')
        .setURL('https://techtitive.github.io/website/')
        .setStyle(ButtonStyle.Link)

        const row = new ActionRowBuilder().addComponents(button);

        await interaction.reply({embeds: [embed1], components: [row]});
    }
}