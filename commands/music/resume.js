const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('resume')
		.setDescription('Resume the queue'),

	async execute(interaction) {
		const queue = interaction.client.player.getQueue(interaction.guild.id);

        if (!queue) await interaction.reply(`No queue found for your guild`);

        const success = await queue.setPaused(false);
        await interaction.reply(success ? `Resumed ✅` : `Music is already playing`);
	},
};
