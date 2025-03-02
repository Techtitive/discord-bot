const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Used to ban a user')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user you want to ban')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason why you are banning')
                .setRequired(false)),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        let reason = interaction.options.getString('reason') || "No reason provided.";
        const userId = user.id;

                if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
                    const embed4 = {
                        color: 0xff0000,
                        author: {
                            name: 'You do not have permissions to ban members in this server.',
                        }
                    };
                    return await interaction.reply({ embeds: [embed4], ephemeral: true });
                }

        // Prevent banning self
        if (interaction.user.id === userId) {
            const embed1 = {
                color: 0xff0000,
                author: {
                    name: 'You cannot ban yourself!',
                }
            };
            return await interaction.reply({ embeds: [embed1], ephemeral: true });
        }

        try {
            // DM the user before banning
            await user.send({
                embeds: [{
                    color: 0xff0000,
                    description: `You have been **Banned** from **${interaction.guild.name}** | Reason: ${reason}`
                }]
            }).catch(() => console.log(`Could not send ban message to ${user.tag}`));

            // Ban the user
            await interaction.guild.members.ban(userId, { reason });

            // Success message
            const successEmbed = {
                color: 0x00ff00,
                description: `✅ Successfully banned **${user.username}** | Reason: ${reason}`
            };
            await interaction.reply({ embeds: [successEmbed] });

        } catch (err) {
            console.error(err);
            const embed2 = {
                color: 0xff0000,
                author: {
                    name: 'I cannot ban this user!',
                }
            };
            return interaction.reply({ embeds: [embed2], ephemeral: true });
        }
    }
};
