const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('spam')
		.setDescription('Spams text')
		.addStringOption(option => option.setName('text').setDescription('Text to spam').setRequired(true)),

	async execute(interaction) {
		const text = interaction.options.getString('text');
        
        await interaction.reply(text);
        for(let i = 0; i < 4; i++) {
            await interaction.followUp(text)
        }
	},
};
