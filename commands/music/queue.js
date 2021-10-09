const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('Shows current queue'),

	async execute(interaction) {
		const player = interaction.client.player;

        console.log(player.tracks)
	},
};
