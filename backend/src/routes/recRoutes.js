const express = require('express');
const router = express.Router();
const { getBestMatch } = require('../controllers/recController/cosineCalcController');

// Route to get the best match for the user
router.post('/newUserRec', getBestMatch);

module.exports = router;
