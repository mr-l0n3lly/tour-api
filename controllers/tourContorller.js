const Tour = require('../models/tourModel');

exports.getAllTours = async (req, res) => {
	try {
		const queryObj = { ...req.query };
		const excludedFields = ['page', 'sort', 'limit', 'fields'];

		excludedFields.forEach((el) => delete queryObj[el]);

		let query = Tour.find(queryObj);

		if (req.query.sort) {
			query = query.sort(req.query.sort);
		}

		const page = req.query.page ? req.query.page * 1 : 1;
		const limit = req.query.limit ? req.query.limit * 1 : 100;
		const skip = (page - 1) * limit;

		query = query.skip(skip).limit(limit);

		if (req.query.page) {
			const numTours = await Tour.countDocuments();
			if (skip >= numTours) throw new Error('This page does not exist');
		}

		const tours = await query;

		res.status(200).json({
			status: 'success',
			result: tours.length,
			data: {
				tours: tours,
			},
		});
	} catch (err) {
		res.status(404).json({
			status: 'failure',
			message: err,
		});
	}
};

exports.getTour = async (req, res) => {
	try {
		const tour = await Tour.findById(req.params.id);

		res.status(200).json({
			status: 'success',
			data: {
				tour: tour,
			},
		});
	} catch (err) {
		res.status(404).json({
			status: 'failure',
			message: err,
		});
	}
};

exports.createTour = async (req, res) => {
	try {
		const newTour = await Tour.create(req.body);

		res.status(201).json({
			status: 'success',
			data: {
				tour: newTour,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'failure',
			message: err,
		});
	}
};

exports.updateTour = async (req, res) => {
	try {
		const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		res.status(201).json({
			status: 'success',
			data: {
				tour: tour,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'failure',
			message: err,
		});
	}
};

exports.deleteTour = (req, res) => {
	try {
		Tour.findByIdAndDelete(req.params.id);

		res.status(200).json({
			status: 'success',
		});
	} catch (err) {
		res.status(400).json({
			status: 'failure',
			message: err,
		});
	}
};
