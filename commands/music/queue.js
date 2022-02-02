const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('Returns the queue'),

	async execute(interaction) {
		const queue = interaction.client.player.getQueue(interaction.guild.id);

        if (!queue) return void await interaction.reply('No queue found for your guild');

        const current = await queue.current;

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Queue')
            .setAuthor('Cat Bot', interaction.client.user.displayAvatarURL({ size: 1024, dynamic: true }))
            .setTimestamp()
            .setFooter(`Requested by ${interaction.user.tag}`, `${interaction.user.avatarURL()}`)
            .addField('Now Playing', `${current.title} by ${current.author}`);

        if (queue.tracks.length !== 0) {
            for (let i = 0; i < queue.tracks.length; i++) {
                embed.addField(`${i+1}. ${queue.tracks[i].title}`, `by ${queue.tracks[i].author}`);
            }
        }
        
        await interaction.reply({embeds: [embed]})
	},
};