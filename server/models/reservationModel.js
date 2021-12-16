const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'There must be a user']
  },
  movie: {
    type: mongoose.Schema.ObjectId,
    ref: 'Movie',
    required: [true, 'There must be a movie']
  },
  reservedSeats: [{ type: Number, unique: true, min: 1, max: 30 }], //The same seat can't be reserved twice
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
