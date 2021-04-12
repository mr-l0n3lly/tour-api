const express = require('express');
const authController = require('../controllers/authController');

const {
	getAllTours,
	createTour,
	getTour,
	updateTour,
	deleteTour,
} = require('../controllers/tourContorller');

const tourRouter = express.Router();

// tourRouter.param('id', checkID);

tourRouter.param('id', (req, res, next, val) => {
	next();
});

tourRouter.route('/').get(authController.protect, getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = tourRouter;
