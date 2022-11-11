const fs = require('fs');
const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const { Player } = require('discord-player');

// Check for token in env vars
if("TOKEN" in process.env) {
	console.log('Found token in environmental variables, loading');
	var token = process.env.TOKEN;

} else {
	var { token } = require('./config.json');
}

// Create instances
global.client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });
client.player = new Player(client);

// Read Events
require('./events/player/player.js')

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);

	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Read Commands
client.commands = new Collection();
fs.readdirSync('./commands/').forEach(dirs => {
	const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

	for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        client.commands.set(command.data.name, command);
        delete require.cache[require.resolve(`./commands/${dirs}/${file}`)];
    };
})

// Login to Discord with  client's token
client.login(token);


