const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('Pause the current song'),

	async execute(interaction) {
		const queue = interaction.client.player.getQueue(interaction.guild.id);

        if (!queue) await interaction.reply(`No queue found for your guild`);

        const success = queue.setPaused(true);
        await interaction.reply(success ? `Paused ✅` : `No music currently playing... wtf you trying to pause??`);
	},
};
