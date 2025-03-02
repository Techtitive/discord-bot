const { Client, GatewayIntentBits, Collection, PermissionsBitField, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
require('dotenv').config();
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});

client.commands = new Collection();

const fs = require('fs');

const functions = fs.readdirSync('./Discord/src/functions').filter(file => file.endsWith('.js'));
const commandFolders = fs.readdirSync('./Discord/src/commands');

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleCommands(commandFolders, "./Discord/src/commands");
    client.login(process.env.DISCORD_TOKEN || 'MTM0Mzk1ODg2OTkxMDQ5MTE0Nw.GZthzO.DQ28fJBwN8mMBtNAaUcNIVczdsMveVYJiKpxLQ');
})();

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction, client);
    }
    catch (error) {
        console.error(error);
        await interaction.reply({
            content: 'There was an error while executing this command!',
            ephemeral: true
        })
    }
})

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton())
        return;
    interaction.reply('button clicked');
});

client.on("messageCreate", async (message) => {
    const prefix = '!'

        if(message.author.bot)
        return;

    if(!message.content.startsWith(prefix)) return;

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/\s+/);
    const command = args.shift().toLowerCase();

    if (command === "ban") {
        if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            const embed4 = {
                color: 0xff0000,
                description: '❌ You do not have permissions to ban members in this server.'
            };
            return message.channel.send({ embeds: [embed4] });
        }

        const member = message.mentions.members.first();
        if (!member) {
            const embed8 = {
                color: 0xff0000,
                description: '❌ You must specify a member to ban.'
            };
            return message.channel.send({ embeds: [embed8] });
        }

        // Prevent banning self
        if (message.member.id === member.id) {
            const embed1 = {
                color: 0xff0000,
                description: '❌ You cannot ban yourself!'
            };
            return message.channel.send({ embeds: [embed1] });
        }

        let reason = args.slice(1).join(' ') || "No reason provided.";

        try {
            // DM the user before banning
            await member.user.send({
                embeds: [{
                    color: 0xff0000,
                    description: `⚠️ You have been **banned** from **${message.guild.name}** | Reason: ${reason}`
                }]
            }).catch(() => console.log(`Could not send ban message to <@${member.user.id}>`));

            // Ban the user
            await message.guild.members.ban(member, { reason });

            // Success message
            const successEmbed = {
                color: 0x00ff00,
                description: `✅ Successfully banned **<@${member.user.id}>** | Reason: ${reason}`
            };
            await message.channel.send({ embeds: [successEmbed] });

        } catch (err) {
            console.error(err);
            const embed2 = {
                color: 0xff0000,
                description: '❌ I cannot ban this user! Check my permissions or their role.'
            };
            return message.channel.send({ embeds: [embed2] });
        }
    }

    else if (command === "unban") {
        if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            const embed4 = {
                color: 0xff0000,
                description: '❌ You do not have permissions to unban members in this server.'
            };
            return message.channel.send({ embeds: [embed4] });
        }

        const member = args[0];
        const userid = args[0];
        if (!member) {
            const embed8 = {
                color: 0xff0000,
                description: '❌ You must specify a userID to unban.'
            };
            return message.channel.send({ embeds: [embed8] });
        }

        // Prevent banning self
        if (message.member.id === member.id) {
            const embed1 = {
                color: 0xff0000,
                description: '❌ You cannot unban yourself!'
            };
            return message.channel.send({ embeds: [embed1] });
        }

        try {
            // Fetch ban list and check if the user is actually banned
            const bannedUsers = await message.guild.bans.fetch();
            const bannedUser = bannedUsers.get(userid);
    
            if (!bannedUser) {
                const embed3 = {
                    color: 0xff0000,
                    description: '⚠️ This user is **not banned** in this server.'
                };
                return message.channel.send({ embeds: [embed3] });
            }

            // Ban the user
            await message.guild.members.unban(member);

            // Success message
            const successEmbed = {
                color: 0x00ff00,
                description: `✅ Successfully unbanned **<@${member.id}>**`
            };
            await message.channel.send({ embeds: [successEmbed] });

        } catch (err) {
            console.error(err);
            const embed2 = {
                color: 0xff0000,
                description: '❌ I cannot unban this user! Maybe they are not in the ban list or the ID is wrong'
            };
            return message.channel.send({ embeds: [embed2] });
        }
    }

    else if (command === "help"){
                const avatar = message.member.displayAvatarURL({ dynamic: true });
        
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
        
                await message.channel.send({embeds: [embed1], components: [row]});
    }
});
