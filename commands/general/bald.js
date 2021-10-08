const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bald')
		.setDescription('bald')
		.addUserOption(option => option.setName('user').setDescription('Select a user').setRequired(true)),

	async execute(interaction) {
		const user = interaction.options.getUser('user');

		await interaction.reply(`${user} is bald!`);
	},
};
