const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');

exports.getAllUsers = catchAsync(async (req, res) => {
	const users = await User.find();

	res.status(200).json({
		status: 'success',
		results: users.length,
		data: {
			users,
		},
	});
});

exports.getUser = (req, res) => {
	const required = 0;

	if (required === undefined) {
		res.status(404).json({
			status: 'failure',
			data: {
				user: 'Wrong id specified',
			},
		});
	} else {
		res.status(200).json({
			status: 'success',
			data: {
				user: 'none',
			},
		});
	}
};

exports.createUser = (req, res) => {
	res.status(200).send('Done');
};

exports.updateUser = (req, res) => {
	res.status(200).json({
		status: 'Success',
		data: {
			tour: '<Updated tour .../>',
		},
	});
};

exports.deleteUser = (req, res) => {
	res.status(204).send('Done');
};
