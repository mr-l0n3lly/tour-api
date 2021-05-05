const jwt = require('jsonwebtoken');
const e = require('express');
const AppError = require('../utils/AppError');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const { promisify } = require('../utils/utils');

const signToken = (id) =>
	jwt.sign({ id: id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRESS,
	});

exports.signup = catchAsync(async (req, res, next) => {
	const newUser = await User.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		passwordConfirm: req.body.passwordConfirm,
	});

	const token = signToken(newUser._id);

	res.status(201).json({
		status: 'sucess',
		token,
		data: {
			user: newUser,
		},
	});
});

exports.login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	// 1) Check if email and password exists
	if (!email || !password) {
		return next(new AppError('Please  provide email and password', 400));
	}
	// 2) Check if user exists && password is correct
	const user = await User.findOne({ email: email }).select('password');

	if (!user) {
		return next(new AppError('Please provide a valid user email'));
	}

	if (!(await user.correctPassword(password, user.password))) {
		return next(new AppError('Incorrect password'), 401);
	}

	// 3) If everythin ok, send token to clientconst token = '';
	const token = signToken(user._id);
	res.status(200).json({
		status: 'success',
		token,
	});
});

exports.protect = catchAsync(async (req, res, next) => {
	// 1) Getting the tocken and check existence
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
	}

	if (!token) {
		return next(
			new AppError('You are not loggin. Please loggin with token', 401)
		);
	}
	// 2) Validate the token
	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

	// 3) Check if user still exists

	// 4) Check if user changed password after the token was issued

	next();
});
