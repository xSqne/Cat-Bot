const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shuffle')
		.setDescription('Shuffles the current queue'),

	async execute(interaction) {
        const queue = interaction.client.player.getQueue(interaction.guild.id);

        if (!queue) return void await interaction.reply(`No queue found for your guild`);

		try {
			const shuffle = queue.shuffle();
			await interaction.reply(shuffle ? 'Shuffled!' : 'Failed to shuffle...');
		} catch {
			await interaction.reply('Something went wrong... Make sure you put a valid track number');
		}
	},
};
