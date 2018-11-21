const express = require('express');
const helmet = require('helmet');
const bodyParser = require("body-parser");


// Set up the express app
const app = express();

app.use(bodyParser.json());
// Helmet helps you secure your Express apps by setting various HTTP headers
app.use(helmet());

const v1 = require('./routes/v1');

app.use('/v1', v1); // use v1 routes with "v1" prefix
app.use('/api', v1); // use v1 routes with "api" prefix
app.use('/', v1); // Set the default version to latest.

module.exports = app;
