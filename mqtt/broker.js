const mosca = require('mosca');
const vars = require('../config/variables');
require('colors');

exports.init = function() {
	const settings = {
		port: vars.MQTT_PORT
	};

	const server = new mosca.Server(settings);

	server.on('ready', () => {
		console.log('[MQTT] '.green + `Mosca broker started on port ${settings.port}`);
	});
};
