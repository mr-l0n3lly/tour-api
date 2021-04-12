const express = require('express');
const {
	getAllUsers,
	getUser,
	createUser,
	updateUser,
	deleteUser,
} = require('../controllers/userController');

const authController = require('../controllers/authController');

const userRouter = express.Router();

userRouter.post('/signup', authController.signup);
userRouter.post('/login', authController.login);

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = userRouter;
