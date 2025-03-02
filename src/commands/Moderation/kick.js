const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Used to kick a user')
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user you want to kick.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason why you are Kicking.')
                .setRequired(false)),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        let reason = interaction.options.getString('reason') || "No reason provided.";
        const userId = user.id;

                if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
                    const embed4 = {
                        color: 0xff0000,
                        author: {
                            name: 'You do not have permissions to kick members in this server.',
                        }
                    };
                    return await interaction.reply({ embeds: [embed4], ephemeral: true });
                }

        // Prevent banning self
        if (interaction.user.id === userId) {
            const embed1 = {
                color: 0xff0000,
                author: {
                    name: 'You cannot kick yourself!',
                }
            };
            return await interaction.reply({ embeds: [embed1], ephemeral: true });
        }

        try {
            // DM the user before banning
            await user.send({
                embeds: [{
                    color: 0xff0000,
                    description: `You have been **Kickced** from **${interaction.guild.name}** | Reason: ${reason}`
                }]
            }).catch(() => console.log(`Could not send kick message to ${user.tag}`));

            // Ban the user
            await interaction.guild.members.kick(userId, { reason });

            // Success message
            const successEmbed = {
                color: 0x00ff00,
                description: `✅ Successfully Kicked **${user.username}** | Reason: ${reason}`
            };
            await interaction.reply({ embeds: [successEmbed] });

        } catch (err) {
            console.error(err);
            const embed2 = {
                color: 0xff0000,
                author: {
                    name: 'I cannot kick this user!',
                }
            };
            return interaction.reply({ embeds: [embed2], ephemeral: true });
        }
    }
};