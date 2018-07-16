const mongoose = require('mongoose');
const _ = require('lodash');
require('colors');

module.exports = app => {
	const Dock = mongoose.model('docks');

	app.get('/populate', async (req, res) => {
		res.send({ hi: 'there' });
	});

	app.get('/api/listDock/:id', async (req, res) => {
		var response = null;
		try {
			response = await Dock.findById(req.params.id);
		} catch (err) {
			console.log('[API] '.yellow + `ERROR on fetching dock  ${req.params.id}`);
		}
		res.send(response);
	});

	app.get('/api/getDockPositions', async (req, res) => {
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
		res.send(docks);
	});

	app.post('/api/unlockBicycle/:id', (req, res) => {
		console.log('[API] '.yellow + `Bike unlock, dock: ${req.params.id}, distance ${JSON.stringify(req.body)}`);
		res.send('Bicycle unlocked');
	});

	app.post('/api/malfunction', (req, res) => {
		res.send('malfunction registed');
	});

	app.post('/api/callMobiDock', (req, res) => {
		console.log(
			'[API] '.yellow +
				`Bike request recived { latitude: ${req.body.coords.latitude}, longitude: ${
					req.body.coords.longitude
				} }`
		);
		res.send('done :)');
	});
};
