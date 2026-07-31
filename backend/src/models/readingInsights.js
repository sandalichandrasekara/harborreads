const mongoose = require('mongoose');

const readingSightsSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  numberOfReadBooks: {
    type: Number,
    default: 0
  }
});

const ReadingSights = mongoose.model('ReadingSights', readingSightsSchema);

module.exports = ReadingSights;
