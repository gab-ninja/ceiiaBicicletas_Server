const mongoose = require('mongoose');
const Dock = mongoose.model('docks');

const docaCeiia = new Dock({
	location: {
		type: 'Point',
		coordinates: [-8.679832220077515, 41.172266202587934]
	},
	name: 'Doca do Ceiia',
	slots: 10,
	availableBicycles: []
});
const docaParqueCidade = new Dock({
	location: {
		type: 'Point',
		coordinates: [-8.671935796737671, 41.167347760769395]
	},
	name: 'Doca do Parque da Cidade',
	slots: 15,
	availableBicycles: ['5b55b304f1e508508940073a', '5b55b304f1e508508940073b']
});
const docaCasteloQueijo = new Dock({
	location: {
		type: 'Point',
		coordinates: [-8.689552545547485, 41.167412373235805]
	},
	name: 'Doca do Castelo do Queijo',
	slots: 8,
	availableBicycles: [
		'5b55b304f1e508508940073c',
		'5b55b304f1e508508940073e',
		'5b55b304f1e508508940073d',
		'5b55b304f1e508508940073f'
	]
});
try {
	docaCeiia.save();
	docaCasteloQueijo.save();
	docaParqueCidade.save();
	console.log('[Server] '.magenta + 'Fixed docks populated');
} catch (err) {
	console.log('[Server] '.magenta + 'ERROR on saving in DB');
}
