const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nowplaying')
		.setDescription('Returns current playing song'),

	async execute(interaction) {
		const queue = interaction.client.player.getQueue(interaction.guild.id);

        if (!queue) return void await interaction.reply(`No queue found for your guild`);

        const current = queue.current;
        const timestamp = queue.getPlayerTimestamp();
        const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : current.duration;
        const progress = queue.createProgressBar();

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setThumbnail(current.thumbnail)
            .setAuthor({
				name: 'Cat Bot', 
				iconURL: interaction.client.user.displayAvatarURL({ size: 1024, dynamic: true })})
            .setTimestamp()
            .setFooter({
				text: `Requested by ${interaction.user.tag}`,
				iconURL: `${interaction.user.avatarURL()}`
			})
            .setDescription(`Volume **${queue.volume}**%\nDuration **${trackDuration}**\nRequested by ${current.requestedBy}`)
            .addFields({name: "\u200b", value: `${progress}`});

        await interaction.reply({embeds: [embed]});
	},
};
