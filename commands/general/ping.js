const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),

	async execute(interaction) {
		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Pong!')
			.setAuthor('Cat Bot', interaction.client.user.displayAvatarURL({ size: 1024, dynamic: true }))
			.addFields(
				{ name: 'Latency', value: `${(Date.now() - interaction.createdTimestamp)} ms` },
				{ name: 'API Latency', value: `${Math.round(interaction.client.ws.ping)} ms` }
			)
			.setTimestamp()
			.setFooter(`Requested by ${interaction.user.tag}`, `${interaction.user.avatarURL()}`);

		await interaction.reply({embeds: [embed]});
	},
};
