const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Skip the current song'),

	async execute(interaction) {
        const queue = interaction.client.player.getQueue(interaction.guild.id);

        if (!queue) return await interaction.reply(`No queue found for your guild`);

        const success = queue.skip();
        await interaction.reply(success ? `Skipped! ✅` : `Failed to skip...`);
	},
};
