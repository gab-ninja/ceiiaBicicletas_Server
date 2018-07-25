module.exports = client => {
	client.on('connect', function() {
		client.subscribe('mobidock');
		client.publish('mobidock', 'Hello mqtt');
	});

	client.on('message', function(topic, message) {
		console.log('[MQTT] '.green + `Msg recived on topic ${topic} => ${message.toString()}`);
		//client.end();
	});

	setInterval(() => client.publish('mobidock', 'New msg'), 10000);
};
