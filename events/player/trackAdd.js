module.exports = {
	name: 'trackAdd',

	execute(queue, track) {
		queue.metadata.send(`🎶 | Started playing: **${track.title}** in **${queue.connection.channel.name}**!`);
	}
};
