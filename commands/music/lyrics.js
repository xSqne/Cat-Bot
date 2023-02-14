const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { getLyrics } = require('genius-lyrics-api');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lyrics')
		.setDescription('Shows the lyrics of current song'),

	async execute(interaction) {
        const queue = interaction.client.player.getQueue(interaction.guild.id);
        if (!queue) return interaction.reply({ content: 'There is no song playing!'});

        const options = {
            apiKey: 'lG3yxvQXnUsCPNuE47VJaYYCNlxZsS3lghIdzLZosGs2tWAxAbyUsffOf3fIIRYK',
            title: queue.current.title,
            artist: queue.current.author,
            optimizeQuery: true
        };
        
        const lyrics = await getLyrics(options);

        if (!lyrics) return interaction.reply({ content: 'No lyrics found!'});

        if (lyrics.length < 4096) {
            const lyricsEmbedOne = new EmbedBuilder()
                    .setTitle(`Lyrics for ${queue.current.title}`)
                    .setDescription(lyrics)
                    .setColor("#0099ff");
                
            return await interaction.reply({ embeds: [lyricsEmbedOne]});
        } else {
            const lyricsEmbedOne = new EmbedBuilder()
                    .setTitle(`Lyrics for ${queue.current.title}`)
                    .setDescription(lyrics.slice(0, lyrics.length / 2))
                    .setColor("#0099ff");
                
            await interaction.reply({ embeds: [lyricsEmbedOne]});

            const lyricsEmbedTwo = new EmbedBuilder()
                .setTitle(`Lyrics for ${queue.current.title} (Page 2)`)
                .setDescription(lyrics.slice(lyrics.length / 2, lyrics.length))
                .setColor("#0099ff");
            
            return await interaction.followUp({ embeds: [lyricsEmbedTwo]});
        }
	},
};
