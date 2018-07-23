const mongoose = require('mongoose');
const { Schema } = mongoose;

const bikeSchema = new Schema({
	location: {
		type: { type: String },
		coordinates: []
	},
	batery: Number,
	mileage: Number,
	isAvailable: Boolean,
	isParked: Boolean
});

mongoose.model('bikes', bikeSchema);
