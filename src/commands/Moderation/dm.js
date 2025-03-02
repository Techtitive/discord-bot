const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dm')
        .setDescription('Used to DM a user')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user you want to DM.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The message you want to DM the user')
                .setRequired(true)),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        let Message = interaction.options.getString('message');
        const userId = user.id;


        try {
            // DM the user before banning
            await user.send({
                embeds: [{
                    color: 0xff0000,
                    description: `<@${interaction.user.id}> send, **${Message}**`
                }]
            }).catch(() => console.log(`Could not send message to ${user.tag}`));

            // Success message
            const successEmbed = {
                color: 0x00ff00,
                description: `✅ Successfully sent DM to <@${userId}>`
            };
            await interaction.reply({ embeds: [successEmbed] });

        } catch (err) {
            console.error(err);
            const embed2 = {
                color: 0xff0000,
                author: {
                    name: 'I cannot DM this user!',
                }
            };
            return interaction.reply({ embeds: [embed2], ephemeral: true });
        }
    }
};