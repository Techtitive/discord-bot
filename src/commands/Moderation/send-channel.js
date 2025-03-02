const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('send-channel')
        .setDescription('Used to Send message to a channel in the server')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The message you want to send in the channel.')
                .setRequired(true))
        .addChannelOption(option => 
            option.setName('channel')
            .setDescription('The channel in which you want to send the message.')
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(false)
        ),

    async execute(interaction) {
        let Message = interaction.options.getString('message');
        const channel = interaction.options.getChannel('channel');
        const channelid = channel;



            if(channel){
            try {
            await channel.send({
                embeds: [{
                    color: 0xff0000,
                    description: `<@${interaction.user.id}> sent, **${Message}**`
                }]
            }).catch(() => console.log(`Could not send message in ${channelid}`));
            
            // Success message
            const successEmbed = {
                color:0x00ff00,
                description: `✅ Successfully sent message in ${channelid}`
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
                    description: `<@${interaction.user.id}> sent, **${Message}**`
                }]
            }).catch(() => console.log(`Could not send message in ${channelid}`));

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