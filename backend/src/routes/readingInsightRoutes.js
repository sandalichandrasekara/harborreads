const express = require('express');
const router = express.Router();
const { getNumberOfReadBooks,getWTRBooks,setWTRBooks } = require('../controllers/readingInsightsController');


// Route to get the best match for the user
router.post('/getNoOfReadBooks', getNumberOfReadBooks);
router.post('/getWTRBooks', getWTRBooks);
router.post('/setWTRBooks', setWTRBooks);




module.exports = router;
