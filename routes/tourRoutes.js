const express = require('express');
const { getAllTours, createTour, getTour, updateTour, deleteTour, checkID} = require('../controllers/tourContorller');

const tourRouter = express.Router();

tourRouter.param('id', checkID);

tourRouter.param('id', (req, res, next, val) => {
	console.log('sgfhd');
	next();
});

tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = tourRouter;