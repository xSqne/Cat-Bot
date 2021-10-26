const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('remove')
		.setDescription('Remove a song from the queue')
        .addIntegerOption(option => option.setName('track').setDescription('Track number').setRequired(true)),

	async execute(interaction) {
		const queue = interaction.client.player.getQueue(interaction.guild.id);

        if (!queue) return void await interaction.reply(`No queue found for your guild`);

        const track = interaction.options.getInteger('track') - 1;

        try {
            if (track === 0) {
                const current = queue.current;
                queue.skip();
                
                await interaction.reply(`Successfully removed ${current.title}`);
            } else {
                const removed = queue.remove(track);
                await interaction.reply(`Successfully removed ${removed.title}`);
            }
        } catch (error) {
            await interaction.reply('Something went wrong... Make sure you put a valid track number');
        }
	},
};
