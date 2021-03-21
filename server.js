const env = require('dotenv');
const app = require('./app');

env.config({ path: './.env' });

// Start linstening
app.listen(process.env.PORT, () => {
	console.log(`Server lisntening on ${process.env.PORT}`);
});
