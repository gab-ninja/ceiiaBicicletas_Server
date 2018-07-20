const mongoose = require('mongoose');
const _ = require('lodash');
const axios = require('axios');
require('colors');

module.exports = app => {
	//const Dock = mongoose.model('docks');

	app.post('/mobidock/position', async (req, res) => {
		console.log('[MobiDock] '.yellow + `Recived position  ${JSON.stringify(req.body)}`);
		try {
			const response = await axios.get('http://192.168.1.153/api/1234567', 'ghdsbh');
			console.log('[MobiDock] '.yellow + response);
		} catch (err) {
			console.log(err);
		}
		res.send('Position recived :)');
	});
};
