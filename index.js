const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { Player } = require('discord-player');

// Check for token in env vars
if("TOKEN" in process.env) {
	console.log('Found token in environmental variables, loading');
	var token = process.env.TOKEN;

} else {
	var { token } = require('./config.json');
}

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES] });
client.player = new Player(client);

// Read Events
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for(const file of eventFiles) {
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

// Login to Discord with your client's token
client.login(token);
