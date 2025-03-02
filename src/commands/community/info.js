const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Replies with information!')
        .addSubcommand(subcommand =>
            subcommand.setName('user')
                .setDescription('Replies with user information!')
                .addUserOption(option =>
                    option.setName('name')
                        .setDescription('Name of the user to retrieve information.')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand.setName('server')
                .setDescription('Replies with server information!')
        ),
    
    async execute(interaction, client) {
        const subcommand = interaction.options.getSubcommand();
        console.log(interaction);

        if (subcommand === "user"){
            const user = interaction.options.getUser('name'); // Fixing case sensitivity
            console.log(user);
    
            // Fetch full user data
            const fetchedUser = await client.users.fetch(user.id, { force: true });
    
            // Get avatar (fallback to default if not found)
            let avatar = user.displayAvatarURL({ dynamic: true }) || 'https://cdn.discordapp.com/embed/avatars/0.png';
    
            // Get banner (fallback to null if not found)
            let banner = fetchedUser.bannerURL({ format: 'png', size: 4096 }) || null;
    
            // Fetch guild member to get roles
            let member;
            try {
                member = await interaction.guild.members.fetch(user.id);
            } catch {
                member = null;
            }
    
            // Extract user information
            const name = user.globalName || user.username;
            const createdAt = user.createdAt.toLocaleDateString(); // Formatting date
            const roles = member ? member.roles.cache.map(role => role.name).join(', ') : 'No roles';
    
            // Embed
            const embed1 = {
                color: 0xff7700,
                author: {
                    name: 'User Information',
                },
                thumbnail: { url: avatar },
                fields: [
                    { name: 'Name', value: name, inline: true },
                    { name: 'Username', value: user.username, inline: true },
                    { name: 'Tag', value: `<@${user.id}>`, inline: true },
                    { name: 'ID', value: user.id, inline: true },
                    { name: 'Created At', value: createdAt, inline: true },
                    { name: 'Roles', value: roles, inline: true }
                ]
            };
    
            // Add banner image if available
            if (banner) {
                embed1.image = { url: banner };
            }
    
            // Buttons
            const button1 = new ButtonBuilder()
                .setLabel('Profile')
                .setURL(`https://discord.com/users/${user.id}`)
                .setStyle(ButtonStyle.Link);
    
            const button2 = new ButtonBuilder()
                .setLabel('Avatar')
                .setURL(avatar)
                .setStyle(ButtonStyle.Link);
    
            const actionRow = new ActionRowBuilder().addComponents(button1, button2);
    
            if (banner) {
                const button3 = new ButtonBuilder()
                    .setLabel('Banner')
                    .setURL(banner)
                    .setStyle(ButtonStyle.Link);
                actionRow.addComponents(button3);
            }
    
            await interaction.reply({ embeds: [embed1], components: [actionRow] });
        }

        if (subcommand === "server") {
                    const avatar = interaction.guild.iconURL({ dynamic: true });
                    if (!avatar || avatar ===  null || avatar === undefined || avatar === "") {
                        avatar = 'https://cdn.discordapp.com/embed/avatars/0.png';
                    }
                    const name = interaction.guild.name;
            
                    const embed1 = {
                        color: 0xff7700,
                        author: {
                            name: 'Server Information',
                        },
                        thumbnail: {
                            url: avatar
                        },
                        Fields: [{
                            name: 'Name',
                            value: name,
                            inline: true
                        },
                        {
                            name: 'ID',
                            value: interaction.guild.id,
                            inline: true
                        },
                        {
                            name: 'Owner',
                            value: `<@${interaction.guild.ownerId}>`,
                            inline: true
                        },
                        {
                            name: 'Members',
                            value: interaction.guild.memberCount,
                            inline: true
                        },
                        {
                            name: 'Roles',
                            value: interaction.guild.roles.cache.map(role => role.name).join(', '),
                            inline: true
                        },
                        {
                            name: 'Channels',
                            value: interaction.guild.channels.cache.size,
                            inline: true
                        },
                        {
                            name: 'Created At',
                            value: interaction.guild.createdAt,
                            inline: true
                        }]
                    }
            
                    const button1 = new ButtonBuilder()
                        .setLabel('Profile')
                        .setURL(`https://discord.com/channels/${interaction.guild.id}`)
                        .setStyle(ButtonStyle.Link)
            
                    const button2 = new ButtonBuilder()
                        .setLabel('Avatar')
                        .setURL(avatar)
                        .setStyle(ButtonStyle.Link)
            
            
            
                    const row = new ActionRowBuilder().addComponents(button1, button2);
                    await interaction.reply({embeds: [embed1], components: [row]});
        }
    }
};
