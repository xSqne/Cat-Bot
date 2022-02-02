const { SlashCommandBuilder } = require('@discordjs/builders');
const ms = require('ms');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('seek')
		.setDescription('Skip to a specified timestamp of the song')
        .addStringOption(option => option.setName('timestamp').setDescription('Timestamp').setRequired(true)),

	async execute(interaction) {
		const queue = interaction.client.player.getQueue(interaction.guild.id);

        if (!queue) return void await interaction.reply(`No queue found for your guild`);
		try {
			const timeInMS = ms(interaction.options.getString('timestamp'));
			const success = await queue.seek(timeInMS);

        	await interaction.reply(success ? `Skipped to ${ms(timeInMS, { long: true })}` : "Failed to skip to specified timestamp");
		} catch (error) {
			await interaction.reply("Something went wrong.. We might not support the timestamp you provided yet.")
		}
	},
};
