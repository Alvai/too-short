const express = require('express');
const shortsController = require('../../controllers').urls;

const router = express.Router({ mergeParams: true });

// availability Controller
router.post('/links', shortsController.create);
router.get('/links/:code', shortsController.retrieveById);

module.exports = router;
