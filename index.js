const express = require('express');
const keys = require('./config/keys');
const vars = require('./config/variables');
require('colors');
const bodyParser = require('body-parser');

const broker = require('./mqtt/broker');
broker.init();
var mqtt = require('mqtt');
var client = mqtt.connect(
	'mqtt://localhost',
	[{ port: vars.MQTT_PORT }]
);

const mongoose = require('mongoose');
require('./models');
mongoose.connect(keys.mogno);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./routes/apiRoutes')(app);
require('./routes/mobiDockRoutes')(app);
require('./routes/populateRoutes')(app);
require('./mqtt/routes')(client);

const PORT = process.env.PORT || vars.SERVER_DEFAULT_PORT;
app.listen(PORT, () => {
	console.log('[Server] '.magenta + 'Server started on port ' + PORT);
});
