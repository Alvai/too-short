const express = require('express');

const router = express.Router();

// Basic routes
router.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the Kist API! Documentation is not available yet',
}));

// Model related routes
router.use('/', require('./shorts.routes.js'));

// Setup a default catch-all route that sends back a welcome message in JSON format.
router.get('*', (req, res) => res.status(404).send({
  message: 'Don\'t try to be sneaky',
}));

module.exports = router;
