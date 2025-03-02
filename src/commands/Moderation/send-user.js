const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('send-user')
        .setDescription('Used to Send message to a user in the server')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user you want to send message.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The message you want to send to the user')
                .setRequired(true))
        .addChannelOption(option => 
            option.setName('channel')
            .setDescription('The channel in which you want to send the message.')
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(false)
        ),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        let Message = interaction.options.getString('message');
        const channel = interaction.options.getChannel('channel')
        const userId = user.id;



            if(channel){
            try {
            await channel.send({
                embeds: [{
                    color: 0xff0000,
                    description: `<@${interaction.user.id}> sent, **${Message}** to <@${userId}>`
                }]
            }).catch(() => console.log(`Could not send message to ${user.tag}`));
            
            // Success message
            const successEmbed = {
                color: 0x00ff00,
                description: `✅ Successfully sent message to <@${userId}>`
            };
            await interaction.reply({ embeds: [successEmbed] });

        } catch (err) {
            console.error(err);
            const embed2 = {
                color: 0xff0000,
                author: {
                    name: 'I cannot send the message.',
                }
            };
            return interaction.reply({ embeds: [embed2], ephemeral: true });
        }
        
    }
    else if (!channel){
        try {
            await interaction.reply({
                embeds: [{
                    color: 0xff0000,
                    description: `<@${interaction.user.id}> sent, **${Message}** to <@${userId}>`
                }]
            }).catch(() => console.log(`Could not send message to ${user.tag}`));

        } catch (err) {
            console.error(err);
            const embed2 = {
                color: 0xff0000,
                author: {
                    name: 'I cannot send the message.',
                }
            };
            return interaction.reply({ embeds: [embed2], ephemeral: true });
        }
    }
    }
};