const Room = require('./../models/roomModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllRooms = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Room.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const rooms = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: rooms.length,
    data: {
      rooms
    }
  });
});

exports.getRoom = catchAsync(async (req, res, next) => {
  const roomID = req.params.id;
  if (!roomID) return new AppError('Please provide an id', 400);

  const room = await Room.findById(roomID);

  res.status(200).json({
    status: 'success',
    data: {
      room
    }
  });
});

exports.postRoom = catchAsync(async (req, res, next) => {
  const room = await Room.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      room
    }
  });
});

exports.updateRoom = catchAsync(async (req, res, next) => {
  const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!room) {
    return next(new AppError('No room found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      room
    }
  });
});

exports.deleteRoom = catchAsync(async (req, res, next) => {
  const room = await Room.findByIdAndDelete(req.params.id);

  if (!room) {
    return next(new AppError('No room found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
