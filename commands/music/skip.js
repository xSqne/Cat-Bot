const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Skip the current song'),

	async execute(interaction) {
        const queue = interaction.client.player.getQueue(interaction.guild.id);

        if (!queue) return void await interaction.reply(`No queue found for your guild`);

		try {
			const skip = await queue.skip();
			await interaction.reply(skip ? `Skipped!` : 'Failed to skip...');
		} catch {
			await interaction.reply('Something went wrong... Make sure you put a valid track number');
		}
	},
};
