const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A movie must have a title']
  },
  date: {
    type: Date,
    required: [true, 'A movie must have a date']
  },
  startTime: {
    type: Date,
    required: [true, 'A movie must have a start time']
  },
  endTime: {
    type: Date,
    required: [true, 'A movie must have a end time']
  },
  room: {
    type: mongoose.Schema.ObjectId,
    ref: 'Room',
    required: [true, 'There must be a screening room for the movie']
  },
  image: {
    type: String,
    default: 'default.jpg'
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
