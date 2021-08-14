const express = require('express');
const cors = require('cors');
const path = require('path');

if (process.env.NODE_ENV !== 'production') {
	// dotenv populates process.env using the .env file
	// in the root directory. when in production,
	// heroku populates process.env

	// we use git for deployment on heroku
	// and we cant push the .env file to the git repo
	// that's why we only use dotenv in development

	// with this configuration the app uses .env
	// in developement and uses heroku-injected
	// environment variables in production
	require('dotenv').config();
}

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + '/client/build'));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), (err) => {
	if (err) throw err;
	console.log('Node app is running on port', app.get('port'));
});

// create charge with stripe
app.post('/payment', (req, res) => {
	const body = {
		// not safe, youre supposed to determine the
		// price in the backend
		amount: req.body.amount,
		source: req.body.token.id,
		currency: 'usd',
	};

	stripe.charges.create(body, (err) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.sendStatus(200);
		}
	});
});
