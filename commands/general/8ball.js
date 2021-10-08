const { SlashCommandBuilder } = require('@discordjs/builders');

const answers = [
    "It is certain",
    "Without a doubt",
    "Definitely",
    "Most likely",
    "Outlook good",
    "Yes!",
    "Try again",
    "Reply hazy",
    "Can't predict",
    "No!",
    "Unlikely",
    "Sources say no",
    "Very doubtful"
];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('8ball')
		.setDescription('Answers a question')
		.addStringOption(option => option.setName('question').setDescription('Ask a question').setRequired(true)),

	async execute(interaction) {
        // Picks a random item from answer array
		await interaction.reply(answers[Math.floor(Math.random()*answers.length)]);
	},
};
