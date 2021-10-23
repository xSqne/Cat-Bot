const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('jump')
		.setDescription('Jump to a song from the queue')
        .addIntegerOption(option => option.setName('track').setDescription('Track number').setRequired(true)),

	async execute(interaction) {
		const queue = interaction.client.player.getQueue(interaction.guild.id);

        if (!queue) return void await interaction.reply(`No queue found for your guild`);

        const track = interaction.options.getInteger('track') - 1;

        try {
            const jump = queue.jump(track);
            await interaction.reply(`Jumped to ${queue.tracks[track].title}`);
        } catch (error) {
            await interaction.reply('Something went wrong... Make sure you put a valid track number');
        }
	},
};