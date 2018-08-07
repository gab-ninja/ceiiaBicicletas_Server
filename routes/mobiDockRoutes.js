const mongoose = require('mongoose');
const _ = require('lodash');
const axios = require('axios');
require('colors');

module.exports = (app, coordinates, client) => {
	//const Dock = mongoose.model('docks');
	app.get('/mobidock/map', (req, res) => {
		const lat = coordinates[0];
		const long = coordinates[1];
		res.redirect(
			`https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=17&size=1200x1000&scale=2&maptype=satellite&markers=color:blue%7Clabel:P%7C${lat},${long}&markers=color:blue%7Clabel:S%7C${lat},${lat}key=AIzaSyDKocQZpHl1hMBRSiX-u3dchGGMtfAhRvI`
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
