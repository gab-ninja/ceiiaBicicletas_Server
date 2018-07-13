const mongoose = require('mongoose');
const { Schema } = mongoose;

const bicycleSchema = new Schema({
	location: {
		type: { type: String },
		coordinates: []
	},
	batery: Number,
	mileage: Number,
	isAvailable: Boolean,
	isParked: Boolean
});

mongoose.model('bicycles', bicycleSchema);
