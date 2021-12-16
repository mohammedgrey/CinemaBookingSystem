const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  seatsNumber: {
    type: Number
  },
  name: {
    type: String,
    default: 'Main Screening Room'
  }
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
