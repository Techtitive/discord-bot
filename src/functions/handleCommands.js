const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
require('dotenv').config();
const fs = require('fs');

const clientID = '1343958869910491147';
const guildID = '1230053833426866206';

module.exports = async (client) => {
    client.handleCommands = async (commandFolders, path) => {
        client.commandArray = [];
        for (folder of commandFolders) {
            const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));
            for (file of commandFiles) {
                const command = require(`../commands/${folder}/${file}`);
                client.commands.set(command.data.name, command);
                client.commandArray.push(command.data.toJSON());
            }
        }

        const rest = new REST({
            version: '10'
        }).setToken(process.env.DISCORD_TOKEN || 'MTM0Mzk1ODg2OTkxMDQ5MTE0Nw.GZthzO.DQ28fJBwN8mMBtNAaUcNIVczdsMveVYJiKpxLQ');

        (async () => {
            try{
                console.log('Started refreshing application commands.');
                await rest.put(
                    Routes.applicationGuildCommands(clientID, guildID),
                    {
                        body: client.commandArray
                    }
                )
                console.log('Successfully reloaded application (/) commands.');
            } catch (error){
                console.error(error);
            }
        })();
    }
}
