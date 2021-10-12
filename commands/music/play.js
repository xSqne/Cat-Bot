const { SlashCommandBuilder } = require('@discordjs/builders');
const { QueryType } = require('discord-player');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play music')
		.addStringOption(option => option.setName('music').setDescription('Name/URL').setRequired(true)),

	async execute(interaction) {
		await interaction.deferReply();

		const player = interaction.client.player;

		if (!interaction.member.voice.channelId) return void await interaction.followUp({content:'You are not in a voice channel!', ephemeral: true});

		const result = await player.search(interaction.options.getString('music'), {
			requestedBy: interaction.user.tag,
			searchEngine: QueryType.AUTO
		});

		if (!result || !result.tracks.length) return void await interaction.followUp({content: 'Could not find any matches...', ephemeral: true});

		const queue = await player.createQueue(interaction.guild, {
			metadata: interaction.channel
		});

		try {
			if (!queue.connection) await queue.connect(interaction.member.voice.channel);
		} catch {
			await player.deleteQueue(interaction.guild.id);
			return void await interaction.followUp('I cannot join the voice channel');
		}		

		await interaction.followUp(`Loading your ${result.playlist ? 'playlist' : 'track'}...`);

		result.playlist ? queue.addTracks(result.tracks) : queue.addTrack(result.tracks[0]);

		if (!queue.playing) await queue.play();
	},
};
