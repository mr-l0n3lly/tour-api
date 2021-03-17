const fs = require('fs');
const express = require('express');

const app = express();

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

app.listen(3000, () => {
	console.log('Server lisntening on 3000');
});