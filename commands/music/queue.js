const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageButton} = require('discord.js'); 
const paginationEmbed = require('discordjs-button-pagination');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('Returns the queue'),

	async execute(interaction) {
		const queue = interaction.client.player.getQueue(interaction.guild.id);

        if (!queue) return void await interaction.reply('No queue found for your guild');

        const tracks = await queue.tracks;

        const current = await queue.current;

        const embeds = [];
        const buttons = [];

        const button1 = new MessageButton()
                .setCustomId('previousbtn')
                .setLabel('Previous')
                .setStyle('DANGER');

        buttons.push(button1)

        const button2 = new MessageButton()
                .setCustomId('nextbtn')
                .setLabel('Next')
                .setStyle('SUCCESS');

        buttons.push(button2)

        if (tracks !== 0) {
            for (let i = 0; i < Math.floor(tracks.length / 5); i++) {
                const embedTemplate = new MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle('Queue')
                        .setAuthor('Cat Bot', interaction.client.user.displayAvatarURL({ size: 1024, dynamic: true }))
                        .setTimestamp()
                        .addField('Now Playing', `${current.title} by ${current.author}`);

                for (let j = 0; j < 5; j++) {
                    embedTemplate.addField(`${i*5 + j + 1}. ${tracks[i*5 + j].title}`, `by ${tracks[i*5 + j].author}`);
                }

                embeds.push(embedTemplate);
            }

            // Case when there the tracks aren't a multiple of 5 and other tracks are still left
            const embedTemplate = new MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle('Queue')
                        .setAuthor('Cat Bot', interaction.client.user.displayAvatarURL({ size: 1024, dynamic: true }))
                        .setTimestamp()
                        .addField('Now Playing', `${current.title} by ${current.author}`);

            const allTracksLength = tracks.length;
            for (let l = 0; l < allTracksLength % 5; l++) {
                embedTemplate.addField(`${allTracksLength - l}. ${tracks[allTracksLength - l - 1].title}`, `by ${tracks[allTracksLength - l - 1].author}`);
            }

            embeds.push(embedTemplate)
        }

        paginationEmbed(interaction, embeds, buttons, 10000);
	},
};