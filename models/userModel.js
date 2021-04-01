const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please tell us your name'],
	},
	email: {
		type: String,
		required: [true, 'A user must have an email'],
		trim: true,
		unique: true,
	},
	photo: {
		type: String,
		required: false,
		trim: true,
	},
	password: {
		type: String,
		required: [true, 'A user must have an password'],
		trim: true,
		minlength: 8,
	},
	passwordCorfim: {
		type: String,
		required: [true, 'A user must have an confirmed password'],
		trim: true,
	},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
