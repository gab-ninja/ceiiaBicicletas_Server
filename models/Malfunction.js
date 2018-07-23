const mongoose = require('mongoose');
const { Schema } = mongoose;

const malfunctionSchema = new Schema({
	_user: { type: Schema.Types.ObjectId, ref: 'User' },
	_bike: { type: Schema.Types.ObjectId, ref: 'Bike' },
	date: Date,
	body: String
});

mongoose.model('malfunctions', malfunctionSchema);
