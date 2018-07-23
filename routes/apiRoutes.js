const mongoose = require('mongoose');
const _ = require('lodash');
require('colors');

module.exports = app => {
	const MIN_DIST_TO_DOCK = require('../config/variables').MIN_DIST_TO_DOCK;
	const Dock = mongoose.model('docks');

	app.get('/populate', async (req, res) => {
		res.send({ hi: 'there' });
	});

	app.get('/api/listDock/:id', async (req, res) => {
		console.log('[API] '.yellow + `CALL /api/listDock  id=${req.params.id}`);
		var response = null;
		try {
			response = await Dock.findById(req.params.id);
		} catch (err) {
			console.log('[API] '.yellow + `ERROR on fetching dock  ${req.params.id}`);
		}
		res.send(response);
	});

	app.get('/api/getDockPositions', async (req, res) => {
		console.log('[API] '.yellow + 'CALL /api/getDockPositions');
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

	app.post('/api/callMobiDock', async (req, res) => {
		console.log(
			'[API] '.yellow +
				`MobiDock request recived { latitude: ${req.body.coords.latitude}, longitude: ${
					req.body.coords.longitude
				} }`
		);
		if (await minDistCheck(req.body.coords.latitude, req.body.coords.longitude)) {
			console.log(
				'[API] '.yellow +
					'done :)' +
					`{ latitude: ${req.body.coords.latitude}, longitude: ${req.body.coords.longitude}`
			);
			res.send('done :)');
		} else {
			console.log(
				'[API] '.yellow +
					'ERR: min distance failed' +
					`{ latitude: ${req.body.coords.latitude}, longitude: ${req.body.coords.longitude}`
			);
			res.send('min distance failed');
		}
	});

	async function minDistCheck(carLat, carLong) {
		docks = await Dock.find({});
		try {
			_.forEach(docks, dock => {
				if (
					distanceInKmBetweenEarthCoordinates(
						dock.location.coordinates[1],
						dock.location.coordinates[0],
						carLat,
						carLong
					) *
						1000 <
					MIN_DIST_TO_DOCK
				) {
					throw 'err';
				}
			});
			return true;
		} catch (err) {
			return false;
		}
	}

	function degreesToRadians(degrees) {
		return (degrees * Math.PI) / 180;
	}

	function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
		var earthRadiusKm = 6371;

		var dLat = degreesToRadians(lat2 - lat1);
		var dLon = degreesToRadians(lon2 - lon1);

		lat1 = degreesToRadians(lat1);
		lat2 = degreesToRadians(lat2);

		var a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		return earthRadiusKm * c;
	}
};
