const mongoose = require('mongoose');

const wtrSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  wantTooReadBooks: {
    type: Number,
    default: 0
  }
});

const wantToReadInsights = mongoose.model('wantToReadInsights', wtrSchema);

module.exports = wantToReadInsights;
