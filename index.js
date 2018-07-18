const express = require('express');
const keys = require('./config/keys');
const colors = require('colors');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
require('./models/Dock');
mongoose.connect(keys.mogno);

const Dock = mongoose.model('docks');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./routes/apiRoutes')(app);
require('./routes/mobiDockRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log('[Server] '.magenta + 'Server started on port ' + PORT);
});
