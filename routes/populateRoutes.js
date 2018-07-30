const axios = require('axios');
module.exports = app => {
	if (require('../config/variables').POPULATE) {
		app.put('/populate/docks', async (req, res) => {
			await require('../populate/addFixedDocks');
			res.send('Docks populated');
		});

		app.put('/populate/bikes', async (req, res) => {
			await require('../populate/addBikes');
			res.send('Bikes populated');
		});

		app.put('/populate/mobidocks', async (req, res) => {
			await require('../populate/addMobiDocks');
			res.send('MobiDocks populated');
		});

		app.put('/populate/test', async (req, res) => {
			try {
				const response = await axios.get('http://192.168.1.153:3000', { ola: 'mundo' });
				console.log(response);
			} catch (err) {
				console.log(err);
			}
			res.send('Test sended');
		});
	}
};
