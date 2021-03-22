const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Tour = require('../models/tourModel');

dotenv.config({ path: './.env' });

mongoose.connect(process.env.DATABASE_LOCAL, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: true,
	useUnifiedTopology: true,
});

// Read json file
const tours = JSON.parse(
	fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// Import data to database
const importData = async () => {
	try {
		await Tour.create(tours);
		// eslint-disable-next-line no-console
		console.log('Data successfuly loaded');
		process.exit();
	} catch (err) {
		// eslint-disable-next-line no-console
		console.log(err);
	}
};

// Delete all data from collection
const deleteData = async () => {
	try {
		await Tour.deleteMany({});
		// eslint-disable-next-line no-console
		console.log('Data successfuly deleted');
		process.exit();
	} catch (err) {
		// eslint-disable-next-line no-console
		console.log(err);
	}
};

if (process.argv[2] === '--import') {
	importData();
} else if (process.argv[2] === '--delete') {
	deleteData();
}
