const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('Returns the queue'),

	async execute(interaction) {
		const queue = interaction.client.player.getQueue(interaction.guild.id);

        if (!queue) return void await interaction.reply(`No queue found for your guild`);

        const current = queue.current;

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Queue')
            .setAuthor('Cat Bot', 'https://cdn.discordapp.com/avatars/776433326574927874/c0ac50a6ad00644847cccfe1a8cfead5.webp?size=80')
            .setTimestamp()
            .setFooter(`Requested by ${interaction.user.tag}`, `${interaction.user.avatarURL()}`)
            .addField(`1. ${current.title}`, `by ${current.author}`);

        if (queue.tracks.length === 0) {
            return void await interaction.reply({embeds: [embed]})
            
        } else {
            for (let i = 0; i < queue.tracks.length; i++) {
                embed.addField(`${i+2}. ${queue.tracks[i].title}`, ` by ${queue.tracks[i].author}`);
            }
        }

        await interaction.reply({embeds: [embed]})
	},
};
