// express is a web framework for node.js to serve up web pages
const express = require('express');

// cors is a middleware that enables CORS on all routes
// (CORS) is a mechanism that enables cross-domain requests
const cors = require('cors');

// body parser is used to parse the request body
const bodyParser = require('body-parser');

// path is relative to the root of the project
const path = require('path');

// if not in production
if (process.env.NODE_ENV !== 'production') {
	// require dotenv to load environment variables from .env file
	require('dotenv').config();
}

// create an express app
const app = express();

// use body parser to parse the request body to JSON
app.use(bodyParser.json());
// this is used to parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// cors
app.use(cors());

// this is used to serve static files from the public directory
app.use(express.static(__dirname + '/client/build'));

// listen for request on hommepage
app.get('/', (req, res) => {
	// send the index.html file
	res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// port
app.set('port', process.env.PORT || 5000);
// listen for requests and error
app.listen(app.get('port'), (err) => {
	if (err) throw err;
	console.log('Node app is running on port', app.get('port'));
});
