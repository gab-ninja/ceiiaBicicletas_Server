const mongoose = require('mongoose');
const Bike = mongoose.model('bikes');

const freeBikes = [
	new Bike({
		location: {
			type: 'Point',
			coordinates: [-8.677310943603516, 41.17170895925401]
		},
		batery: Math.trunc(Math.trunc(Math.random() * 100)),
		mileage: Math.trunc(Math.random() * 1000),
		isAvailable: true,
		isParked: false
	}),
	new Bike({
		location: {
			type: 'Point',
			coordinates: [-8.677568435668945, 41.171773567419706]
		},
		batery: Math.trunc(Math.random() * 100),
		mileage: Math.trunc(Math.random() * 1000),
		isAvailable: true,
		isParked: false
	}),
	new Bike({
		location: {
			type: 'Point',
			coordinates: [-8.67546558380127, 41.16886613688591]
		},
		batery: Math.trunc(Math.random() * 100),
		mileage: Math.trunc(Math.random() * 1000),
		isAvailable: true,
		isParked: false
	}),
	new Bike({
		location: {
			type: 'Point',
			coordinates: [-8.687138557434082, 41.17070752453825]
		},
		batery: Math.trunc(Math.random() * 100),
		mileage: Math.trunc(Math.random() * 1000),
		isAvailable: true,
		isParked: false
	}),
	new Bike({
		location: {
			type: 'Point',
			coordinates: [-8.678255081176758, 41.165312435463605]
		},
		batery: Math.trunc(Math.random() * 100),
		mileage: Math.trunc(Math.random() * 1000),
		isAvailable: true,
		isParked: false
	})
];
const parqueDaCidadeBikes = [
	new Bike({
		location: {
			type: 'Point',
			coordinates: [-8.671935796737671, 41.167347760769395]
		},
		batery: Math.trunc(Math.random() * 100),
		mileage: Math.trunc(Math.random() * 1000),
		isAvailable: true,
		isParked: true
	}),
	new Bike({
		location: {
			type: 'Point',
			coordinates: [-8.671935796737671, 41.167347760769395]
		},
		batery: Math.trunc(Math.random() * 100),
		mileage: Math.trunc(Math.random() * 1000),
		isAvailable: false,
		isParked: true
	})
];
const casteloDoQueijoBikes = [
	new Bike({
		location: {
			type: 'Point',
			coordinates: [-8.689552545547485, 41.167412373235805]
		},
		batery: Math.trunc(Math.random() * 100),
		mileage: Math.trunc(Math.random() * 1000),
		isAvailable: true,
		isParked: true
	}),
	new Bike({
		location: {
			type: 'Point',
			coordinates: [-8.689552545547485, 41.167412373235805]
		},
		batery: Math.trunc(Math.random() * 100),
		mileage: Math.trunc(Math.random() * 1000),
		isAvailable: true,
		isParked: true
	}),
	new Bike({
		location: {
			type: 'Point',
			coordinates: [-8.689552545547485, 41.167412373235805]
		},
		batery: Math.trunc(Math.random() * 100),
		mileage: Math.trunc(Math.random() * 1000),
		isAvailable: true,
		isParked: true
	}),
	new Bike({
		location: {
			type: 'Point',
			coordinates: [-8.689552545547485, 41.167412373235805]
		},
		batery: Math.trunc(Math.random() * 100),
		mileage: Math.trunc(Math.random() * 1000),
		isAvailable: true,
		isParked: true
	})
];

try {
	freeBikes.forEach(async bike => await bike.save());
	parqueDaCidadeBikes.forEach(async bike => await bike.save());
	casteloDoQueijoBikes.forEach(async bike => await bike.save());
	console.log('[Server] '.magenta + 'Bikes populated');
} catch (err) {
	console.log('[Server] '.magenta + 'ERROR on saving in DB');
}
