const mongoose = require('mongoose');
const { Schema } = mongoose;

const mobiDockSchema = new Schema({
	name: String,
	lastLocation: {
		type: { type: String },
		coordinates: []
	}
});

mongoose.model('mobiDocks', mobiDockSchema);
