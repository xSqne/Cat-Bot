const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('Invite link'),

	async execute(interaction) {
		await interaction.reply('https://discord.com/api/oauth2/authorize?client_id=894857417978957834&permissions=0&scope=bot%20applications.commands');
	},
};
