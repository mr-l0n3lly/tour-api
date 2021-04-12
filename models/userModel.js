const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please tell us your name'],
	},
	email: {
		type: String,
		required: [true, 'A user must have an email'],
		unique: true,
		validate: [validator.isEmail, 'Please provide your email'],
	},
	photo: String,
	password: {
		type: String,
		required: [true, 'A user must have an password'],
		minlength: 8,
		select: false,
	},
	passwordConfirm: {
		type: String,
		required: [true, 'A user must have an confirmed password'],
		validate: {
			validator: function (el) {
				return el === this.password;
			},
			message: 'Password are not the same!',
		},
	},
});

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		return next();
	}

	this.password = await bcrypt.hash(this.password, 12);
	this.passwordConfirm = undefined;

	next();
});

userSchema.methods.correctPassword = async (canditatePassword, userPassword) =>
	await bcrypt.compare(canditatePassword, userPassword);

const User = mongoose.model('User', userSchema);

module.exports = User;
