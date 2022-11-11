const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),

	async execute(interaction) {
		const embed = new EmbedBuilder()
			.setColor('#0099ff')
			.setTitle('Pong!')
			.setAuthor({
				name: 'Cat Bot', 
				iconURL: interaction.client.user.displayAvatarURL({ size: 1024, dynamic: true })})
			.addFields(
				{ name: 'Latency', value: `${(Date.now() - interaction.createdTimestamp)} ms` },
				{ name: 'API Latency', value: `${Math.round(interaction.client.ws.ping)} ms` }
			)
			.setTimestamp()
			.setFooter({
				text: `Requested by ${interaction.user.tag}`,
				iconURL: `${interaction.user.avatarURL()}`
			});

		await interaction.reply({embeds: [embed]});
	},
};
