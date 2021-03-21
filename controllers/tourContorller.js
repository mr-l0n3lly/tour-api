const fs = require('fs');

const tours = JSON.parse(
	fs.readFileSync(`${__dirname}/../dataTemp/tours-simple.json`)
);

exports.checkID = (req, res, next, id) => {
	if (id > tours.length) {
		return res.status(404).json({
			status: 'fail',
			message: 'Not found such an id',
		});
	}

	next();
};

exports.getAllTours = (req, res) => {
	res.status(200).json({
		status: 'success',
		results: tours.length,
		data: {
			tours: tours,
		},
	});
};

exports.getTour = (req, res) => {
	const required = tours.find((item) => item.id === Number(req.params.id));

	if (required === undefined) {
		res.status(404).json({
			status: 'failure',
			data: {
				tour: 'Wrong id specified',
			},
		});
	} else {
		res.status(200).json({
			status: 'success',
			data: {
				tour: required,
			},
		});
	}
};

exports.createTour = (req, res) => {
	res.status(200).send('Done');
};

exports.updateTour = (req, res) => {
	res.status(200).json({
		status: 'Success',
		data: {
			tour: '<Updated tour .../>',
		},
	});
};

exports.deleteTour = (req, res) => {
	res.status(204).send('Done');
};
