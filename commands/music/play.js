const { SlashCommandBuilder } = require('@discordjs/builders');
const { QueryType } = require('discord-player');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play music')
		.addStringOption(option => option.setName('music').setDescription('Name/URL').setRequired(true)),

	async execute(interaction) {
		const player = interaction.client.player;

		if (!interaction.member.voice.channelId) await interaction.reply({content:'You are not in a voice channel!', ephemeral: true});

		const result = await player.search(interaction.options.getString('music'), {
			requestedBy: interaction.user.tag,
			searchEngine: QueryType.AUTO
		});

		if (!result) return await interaction.reply({content: 'Could not find any matches...', ephemeral: true});

		const queue = await player.createQueue(interaction.guild, {
			metadata: interaction.channel
		});

		try {
			if (!queue.connection) await queue.connect(interaction.member.voice.channel)
		} catch {
			await player.deleteQueue(interaction.guild.id)
			await interaction.reply('I cannot join the voice channel')
		}

		result.playlist ? queue.addTracks(result.tracks) : queue.addTrack(result.tracks[0]);

		if (!queue.playing) await queue.play();

		await interaction.reply(`Playing ${result.tracks[0]}`)
	},
};
