const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, EmbedBuilder, ButtonBuilder, SystemChannelFlagsBitField} = require('discord.js'); 

const embeds = [];
const pages = {};

const getRow = (id) => {
    const row = new ActionRowBuilder();

    row.addComponents(
        new ButtonBuilder()
            .setCustomId('previousbtn')
            .setLabel('Previous')
            .setStyle('Danger')
            .setDisabled(pages[id] === 0)
    );

    row.addComponents(
        new ButtonBuilder()
            .setCustomId('nextbtn')
            .setLabel('Next')
            .setStyle('Success')
            .setDisabled(pages[id] === embeds.length - 1)
    );

    return row;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('Returns the queue'),

	async execute(interaction) {
		const queue = interaction.client.player.getQueue(interaction.guild.id);
        const id = interaction.user.id;
        
        if (!queue) return void await interaction.reply('No queue found for your guild');

        pages[id] = pages[id] || 0;

        const tracks = await queue.tracks;
        const current = await queue.current;

        if (tracks !== 0) {
            for (let i = 0; i < Math.floor(tracks.length / 5); i++) {
                const embedTemplate = new EmbedBuilder()
                        .setColor('#0099ff')
                        .setTitle('Queue')
                        .setAuthor({
                            name: 'Cat Bot', 
                            iconURL: interaction.client.user.displayAvatarURL({ size: 1024, dynamic: true })})
                        .setTimestamp()
                        .addFields({name: 'Now Playing', value: `${current.title} by ${current.author}`});

                for (let j = 0; j < 5; j++) {
                    embedTemplate.addFields({name: `${i*5 + j + 1}. ${tracks[i*5 + j].title}`, value: `by ${tracks[i*5 + j].author}`});
                }

                embeds.push(embedTemplate);
            }

            // Case when there the tracks aren't a multiple of 5 and other tracks are still left
            const embedTemplate = new EmbedBuilder()
                        .setColor('#0099ff')
                        .setTitle('Queue')
                        .setAuthor({
                            name: 'Cat Bot', 
                            iconURL: interaction.client.user.displayAvatarURL({ size: 1024, dynamic: true })})
                        .setTimestamp()
                        .addFields({name: 'Now Playing', value: `${current.title} by ${current.author}`});

            const allTracksLength = tracks.length;
            for (let l = 0; l < allTracksLength % 5; l++) {
                embedTemplate.addFields({name: `${allTracksLength - l}. ${tracks[allTracksLength - l - 1].title}`, value: `by ${tracks[allTracksLength - l - 1].author}`});
            }

            embeds.push(embedTemplate)
        }

        console.log(embeds);
        console.log(tracks.length);

        const embed = embeds[pages[id]];

        const reply = await interaction.reply({embeds: [embed], components: [getRow(id)]});

        const filter = (interaction) => interaction.customId === 'button' && interaction.user.id === id;
        const collector = reply.createMessageComponentCollector({filter, time: 10000})

        collector.on('collect', async (btnInt) => {
            if(!btnInt) {
                return;
            }

            btnInt.deferUpdate();

            if (btnInt.customId === 'nextbtn' && pages[id] < embeds.length - 1) {
                ++pages[id];
            } else if (btnInt.customId === 'previousbtn' && pages[id] > 0){
                --pages[id];
            }

            if (reply) {
                await reply.edit({
                    embeds: [embed[pages[id]]],
                    components: [getRow(id, pages)]
                });
            } else {
                await interaction.editReply({
                    embeds: [embeds[pages[id]]],
                    components: [getRow(id, pages)]
                });
            }

        });
        
	},
};