const express = require('express');
const cors = require('cors');
const path = require('path');

if (process.env.NODE_ENV !== 'production') {
	// we need to use dotenv to access environment variables when in development
	// in production heroku supplies the environment variables
	require('dotenv').config();
}

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
// for parsing urls
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// specify where to find the static files
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
