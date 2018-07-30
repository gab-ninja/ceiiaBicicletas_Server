const mongoose = require('mongoose');
const MobiDock = mongoose.model('mobiDocks');

const mobiDock = new MobiDock({
	name: 'Mobi Dock 1',
	lastLocation: {
		type: 'Point',
		coordinates: [-8.679832220077515, 41.172266202587934]
	}
});
try {
	mobiDock.save();
	console.log('[Server] '.magenta + 'Mobi docks populated');
} catch (err) {
	console.log('[Server] '.magenta + 'ERROR on saving in DB');
}
