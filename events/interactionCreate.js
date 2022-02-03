module.exports = {
	name: 'interactionCreate',
	
	execute(interaction) {
		console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);

		const client = interaction.client;

		if (interaction.isCommand()) {
			const command = client.commands.get(interaction.commandName);

			try {
				command.execute(interaction);
			} catch (error) {
				console.error(error);
				interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}

		} 
	}
};