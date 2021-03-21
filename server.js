const env = require('dotenv');
const app = require('./app');

env.config({ path: './.env' });

// Start linstening
app.listen(process.env.PORT, () => {
	// eslint-disable-next-line no-console
	console.log(`Server lisntening on ${process.env.PORT}`);
});
