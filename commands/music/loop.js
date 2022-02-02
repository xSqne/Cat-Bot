const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('loop')
		.setDescription('Loops the queue'),

	async execute(interaction) {
		const queue = interaction.client.player.getQueue(interaction.guild.id);

        if (!queue) return void await interaction.reply(`No queue found for your guild`);

        const loop = queue.repeatMode;

        if (loop === 2) {
            const success = await queue.setRepeatMode(0);
            await interaction.reply(success ? `Disabled looping` : `Failed...`);

        } else {
            const success = await queue.setRepeatMode(2);
            await interaction.reply(success ? `Looping the queue` : `Failed...`);
        }        
	},
};
