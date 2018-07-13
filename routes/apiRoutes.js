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
					location: dock.location
				};
			});
		} catch (error) {
			console.log('[API] '.yellow + 'ERROR on fetching dock positions');
		}
		res.send(docks);
	});

	app.post('/api/unlockBicycle/:id', (req, res) => {
		res.send('Bicycle unlocked');
	});

	app.post('/api/malfunction', (req, res) => {
		res.send('malfunction registed');
	});
};
