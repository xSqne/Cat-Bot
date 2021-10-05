const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('test')
            .setLabel('test')
            .setStyle('PRIMARY'),
	);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gay')
		.setDescription('gay'),

	async execute(interaction) {
		const user = interaction.options.getUser('user');

		await interaction.reply({content: 'gay', components: [row]});
	},
};
