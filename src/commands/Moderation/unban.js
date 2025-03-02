const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Used to unban a user')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addStringOption(option =>
            option.setName('userid')
                .setDescription('The user ID you want to unban')
                .setRequired(true)),

    async execute(interaction, client) {
        const userId = interaction.options.getString('userid');

        // Ensure the user has permission to unban
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            const noPermissionEmbed = {
                color: 0xff0000,
                description: '❌ You do not have permission to unban members in this server.'
            };
            return await interaction.reply({ embeds: [noPermissionEmbed], ephemeral: true });
        }

        try {
            // Fetch user info to include in the success message
            const user = await client.users.fetch(userId).catch(() => null);
            
            // Attempt to unban the user
            await interaction.guild.members.unban(userId);

            // Success message
            const successEmbed = {
                color: 0x00ff00,
                description: `✅ Successfully unbanned **${user ? user.tag : 'Unknown User'}**`
            };
            return await interaction.reply({ embeds: [successEmbed] });

        } catch (err) {
            console.error(err);
            const errorEmbed = {
                color: 0xff0000,
                description: '❌ I was unable to unban this user. They may not be banned or I lack the necessary permissions.'
            };
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
    }
};