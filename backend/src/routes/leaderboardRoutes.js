const express = require('express');
const router = express.Router();
const { setLeaderboardScore,getLeaderboard } = require('../controllers/leaderboardController');


// Route to get the best match for the user
router.post('/setLeaderboardScore', setLeaderboardScore);
router.get('/getLeaderboard', getLeaderboard);




module.exports = router;
