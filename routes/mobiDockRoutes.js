const _ = require('lodash');
const axios = require('axios');
require('colors');

module.exports = (app, client) => {
	var coordinates = [41.172120835218664, -8.67996633052826, 40];

	client.on('message', function(topic, message) {
		console.log('[MQTT] '.green.bold + `Msg recived on topic ${topic} => ${message.toString()}`);
		switch (topic) {
			case 'mobidockPos':
				coordinates = _.split(message, ',', 3);
			default:
				break;
		}
	});

	//const Dock = mongoose.model('docks');
	app.get('/mobidock/map', (req, res) => {
		const lat = coordinates[0];
		const long = coordinates[1];
		const angle = coordinates[2];
		res.send(
			`
			<!DOCTYPE html>
			<html>	
				<head>
					<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">
				</head>
				<style>
				body {
					margin: 0;
					width: 100vw;
					height: 100vh;
					position: relative;
				}
				#map{
					width: 100%;
					height: 100%;
				}
				.fas {
					position:absolute;
					top:50%;
					left:50%;
					margin-left: -7px;
					margin-top: -8px;
					transform: rotate(${angle}deg);
				}
				</style>
				<body>
					<iframe id="map" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCoEoH8NLLRDHHjlhPFfid7CDAEzhVVoV0&q=${lat},${long}" allowfullscreen></iframe>
					<i class="fas fa-arrow-up"></i>
				</body>
			</html>
			`
		);
	});

	app.post('/mobidock/position', async (req, res) => {
		console.log('[MobiDock] '.yellow + `Recived position  ${JSON.stringify(req.body)}`);
		var docks = 'null';
		try {
			docks = await Dock.find({});
			docks = _.map(docks, dock => {
				return {
					_id: dock._id,
					name: dock.name,
					slots: dock.slots,
					numberOfBikes: dock.availableBicycles.length,
					location: {
						latitude: dock.location.coordinates[1],
						longitude: dock.location.coordinates[0]
					}
				};
			});
		} catch (error) {
			console.log('[API] '.yellow + 'ERROR on fetching dock positions');
		}
		try {
			const response = await axios.post('http://192.168.1.153/api/1234567', docks);
			console.log('[MobiDock] '.yellow + response);
		} catch (err) {
			console.log(err);
		}
		res.send('Position recived :)');
	});

	app.post('/mobidock/phoneDirections', (req, res) => {
		console.log('[MobiDock] '.yellow + JSON.stringify(req.body));
		client.publish('phoneCommands', JSON.stringify(req.body));
		res.send('recived');
	});
};
