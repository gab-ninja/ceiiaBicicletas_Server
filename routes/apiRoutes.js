module.exports = app => {
	app.get('/api/listDock/:id', (req, res) => {
		res.send('listDock');
	});
	app.get('/api/getDockPositions', (req, res) => {
		res.send('getDockPositions');
	});

	app.post('/api/unlockBicycle/:id', (req, res) => {
		res.send('Bicycle unlocked');
	});

	app.post('api/malfunction', (req, res) => {
		res.send('malfunction registed');
	});
};
