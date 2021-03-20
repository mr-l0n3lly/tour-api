const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dataTemp/tours-simple.json`));

const getAllRoutes = (req, res) => {
	res.status(200).json({
		status: 'success',
		results: tours.length,
		data: {
			tours: tours
		}
	});
}

const getRoute = (req, res) => {
	const required = tours.find(item => item.id === Number(req.params.id));

	if (required === undefined) {
		res.status(404).json({
			status: 'failure',
			data: {
				tour: 'Wrong id specified'
			}
		});
	} else {
		res.status(200).json({
			status: 'success',
			data: {
				tour: required
			}
		});
	}
}

const postRoutes = (req, res) => {
	console.log(req.body);
	res.status(200).send('Done');
}

const patchRoutes = (req, res) =>{
	res.status(200).json({
		status: 'Success',
		data: {
			tour:'<Updated tour .../>' 
		}
	});
}

const deleteRoute = (req, res) => {
	res.status(204).send('Done');
}

app.get('/api/v1/tours', getAllRoutes);

app.get('/api/v1/tours/:id', getRoute);

app.post('/api/v1/tours', postRoutes);

app.patch('/api/v1/tours/:id', patchRoutes);

app.delete('/api/v1/tours/:id', deleteRoute);

app.listen(3000, () => {
	console.log('Server lisntening on 3000');
});