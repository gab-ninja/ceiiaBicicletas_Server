module.exports = client => {
	client.on('connect', function() {
		client.subscribe('presence');
		client.publish('presence', 'Hello mqtt');
	});

	client.on('message', function(topic, message) {
		// message is Buffer
		console.log(message.toString());
		client.end();
	});
};
