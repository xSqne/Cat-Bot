const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

// Format all the commands into JSON
const commandList = []
fs.readdirSync('./commands/').forEach(dirs => {
	const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

	for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
		commandList.push(command.data.toJSON());
        delete require.cache[require.resolve(`./commands/${dirs}/${file}`)];
    };
});

// Register commands
const rest = new REST({ version: '9' }).setToken(token);
rest.put(
	Routes.applicationGuildCommands(clientId, guildId), { body: commandList })
	.then(() => console.log('Successfully registered guild commands.'))
	.catch(console.error);

/*
rest.put(
	Routes.applicationCommands(clientId), { body: commands })
	.then(() => console.log('Successfully registered global commands.'))
	.catch(console.error);
*/