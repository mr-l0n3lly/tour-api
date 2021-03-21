const mongoose = require('mongoose');
const env = require('dotenv');
const app = require('./app');

env.config({ path: './.env' });

mongoose.connect(process.env.DATABASE_LOCAL, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
});

// Start linstening
app.listen(process.env.PORT, () => {
	// eslint-disable-next-line no-console
	console.log(`Server lisntening on ${process.env.PORT}`);
});
