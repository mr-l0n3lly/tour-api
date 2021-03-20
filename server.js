const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dataTemp/tours-simple.json`));

app.get('/api/v1/tours', (req, res) => {
	res.status(200).json({
		status: 'success',
		results: tours.length,
		data: {
			tours: tours
		}
	});
});

app.get('/api/v1/tours/:id', (req, res) => {
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
});

app.post('/api/v1/tours', (req, res) => {
	console.log(req.body);
	res.status(200).send('Done');
});

app.listen(3000, () => {
	console.log('Server lisntening on 3000');
});