// Require the necessary discord.js classes
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const token;

// Check for token in env vars
if("TOKEN" in process.env) {
	console.log('Found token in environmental variables, loading')
	token = process.env.TOKEN
} else {
	token = require('.\config.json')
}

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
module.exports = client;

client.commands = new Collection();

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for(const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
} 

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

// Reply to interactions (Slash Commands)
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);

	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Reply to buttons
client.on('interactionCreate', interaction => {
	if (!interaction.isButton()) return;

	const command = client.commands.get(interaction.message.interaction.commandName);

	try {
		command.button(interaction);
		
	} catch (error) {
		console.error(error);
	}
});

// Login to Discord with your client's token
client.login(token);
