const mongoose = require('mongoose');
const _ = require('lodash');
require('colors');

module.exports = app => {
	//const Dock = mongoose.model('docks');

	app.post('/mobidock/position', (req, res) => {
		console.log('[MobiDock] '.yellow + `Recived position  ${JSON.stringify(req.body)}`);
		res.send('Position recived :)');
	});
};
