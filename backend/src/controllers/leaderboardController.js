// leaderboardController.js

const LeaderboardModel = require('../models/Leaderboard');

// Controller to set leaderboard score for a user
const setLeaderboardScore = async (req, res) => {
  const { username, score } = req.body;
  try {
    // Find the user in the leaderboard
    let user = await LeaderboardModel.findOne({ username });

    // If user doesn't exist, create a new entry
    if (!user) {
      user = new LeaderboardModel({ username, score });
    } else {
      // If user exists, update the score
      user.score = score;
    }

    // Save the user
    await user.save();

    res.status(200).json({ message: 'Leaderboard score updated successfully' });
  } catch (error) {
    console.error('Error setting leaderboard score:', error);
    res.status(500).json({ message: 'Failed to update leaderboard score' });
  }
};

// Controller to get the leaderboard
const getLeaderboard = async (req, res) => {
  try {
    // Find all users and sort by score in descending order
    const leaderboard = await LeaderboardModel.find().sort({ score: -1 });

    res.status(200).json(leaderboard);
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    res.status(500).json({ message: 'Failed to get leaderboard' });
  }
};

module.exports = { setLeaderboardScore, getLeaderboard };
