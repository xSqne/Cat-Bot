const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('disconnect')
		.setDescription('Disconnect the bot'),

	async execute(interaction) {
		const queue = interaction.client.player.getQueue(interaction.guild.id);

        if (queue) {
            await queue.destroy();
            await interaction.reply('Disconnected the player');
        } else {
            await interaction.reply('Not in VC')
        }
	},
};
