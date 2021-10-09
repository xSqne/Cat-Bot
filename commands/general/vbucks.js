const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, ButtonInteraction } = require('discord.js');

const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('disconnect')
            .setLabel('CLICK ME')
            .setStyle('SUCCESS'),
	);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('vbucks')
		.setDescription('Gives free vbucks'),

	async execute(interaction) {
		const user = interaction.options.getUser('user');

		await interaction.reply({content: 'Click the button below for free vbucks!', components: [row]});
	},

	async button(interaction) {
		// Check if user is in a vc, then kick
		if(interaction.member.voice.channelId) {
			await interaction.member.voice.disconnect(['you got scammed L']);
		}

		const userid = interaction.member.id;

		await interaction.reply({content: `<@${userid}> L`, ephemeral: true});
	}
};
