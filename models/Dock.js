const mongoose = require('mongoose');
const { Schema } = mongoose;

const dockSchema = new Schema({
	location: {
		type: { type: String },
		coordinates: []
	},
	name: String,
	slots: Number,
	availableBicycles: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

mongoose.model('docks', dockSchema);
