module.exports = {
	name: 'trackAdd',

	execute(queue, track) {
		queue.metadata.send(`🎶 | Added Track: **${track.title}** in **${queue.connection.channel.name}**!`);
	}
};
