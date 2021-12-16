const Reservation = require('./../models/reservationModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const roles = require('./data/roles');

exports.getAllReservations = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Reservation.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const reservations = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: reservations.length,
    data: {
      reservations
    }
  });
});

exports.getMyReservations = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Reservation.find({ user: req.user._id }),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const reservations = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: reservations.length,
    data: {
      reservations
    }
  });
});

exports.getReservation = catchAsync(async (req, res, next) => {
  const reservationID = req.params.id;
  if (!reservationID) return new AppError('Please provide an id', 400);

  const reservation = await Reservation.findById(reservationID)
    .populate('user')
    .populate('movie');

  res.status(200).json({
    status: 'success',
    data: {
      reservation
    }
  });
});

exports.postReservation = catchAsync(async (req, res, next) => {
  const existingReservations = await Reservation.find({
    movie: req.body.movie
  });
  let reservationsArray = [];
  existingReservations.forEach(reservation => {
    reservationsArray = [...reservationsArray, ...reservation.reservedSeats];
  });
  const wantToReserveSeats = req.body.reservedSeats;
  if (!wantToReserveSeats)
    return next(
      new AppError(
        'You must reserve at least one seat. Make sure you include "reservedSeats" array field in the request body',
        400
      )
    );
  for (let i = 0; i < wantToReserveSeats.length; i += 1)
    if (reservationsArray.includes(wantToReserveSeats[i]))
      return next(new AppError('Seat/s is/are already reserved.', 400));

  const reservation = await Reservation.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      reservation
    }
  });
});

exports.deleteReservation = catchAsync(async (req, res, next) => {
  const reservation = await Reservation.findById(req.params.id);

  if (!reservation)
    return next(new AppError('No reservation found with that ID', 404));

  if (
    req.user.role === roles.CUSTOMER &&
    !reservation.user.equals(req.user._id)
  )
    return next(
      new AppError(
        'A user with a customer role can only delete his/her reservations',
        401
      )
    );

  await Reservation.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null
  });
});
