exports.getAllUsers = (req, res) => {
	res.status(200).json({
		status: 'success',
		results: 4,
		data: {
			users: 'nono',
		},
	});
};

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
