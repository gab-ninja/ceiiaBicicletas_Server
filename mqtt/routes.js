const _ = require('lodash');
module.exports = (client, coordinates) => {
	client.on('connect', function() {
		client.subscribe('mobidock');
		client.subscribe('mobidockPos');
		client.subscribe('phoneCommands');
		client.publish('mobidock', 'Hello mqtt');
	});

	client.on('message', function(topic, message) {
		console.log('[MQTT] '.green + `Msg recived on topic ${topic} => ${message.toString()}`);
		//client.end();

		switch (topic) {
			case 'mobidockPos':
				coordinates = _.split(message, ',', 2);

			default:
				break;
		}
	});

	//setInterval(() => client.publish('mobidock', 'New msg'), 5000);
};
