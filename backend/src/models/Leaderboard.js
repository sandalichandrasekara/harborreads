const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    default: 0
  }
});

const LeaderboardModel = mongoose.model('LeaderboardModel', leaderboardSchema);

module.exports = LeaderboardModel;
