const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('volume')
		.setDescription('Set Volume')
        .addIntegerOption(option => option.setName('volume').setDescription('Volume').setRequired(true)),

	async execute(interaction) {
		const queue = interaction.client.player.getQueue(interaction.guild.id);
        const volume = interaction.options.getInteger('volume');

        if (!queue) return void await interaction.reply(`No queue found for your guild`);

        const success = await queue.setVolume(volume);
        await interaction.reply(success ? `Set player volume to ${volume}%` : 'Failed to set volume');
	},
};
