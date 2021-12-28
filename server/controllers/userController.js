const User = require('./../models/userModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const roles = require('./data/roles');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(User.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const users = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
});
exports.getUserProfile = catchAsync(async (req, res, next) => {
  const userID = req.params.id;
  if (!userID) return new AppError('Please provide a user ID', 400);

  const user = await User.findById(userID).select(
    '-birthdate -__v -passwordChangedAt -email'
  );

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

exports.postUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      newUser
    }
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  // let user = await User.findByIdAndUpdate(req.params.id, req.body, {
  //   new: true,
  //   runValidators: true
  // });

  // 1) Get user from collection
  const user = await User.findById(req.params.id).select('+password');

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }
  if (req.body.email) user.email = req.body.email;
  if (req.body.username) user.username = req.body.username;
  if (req.body.firstName) user.firstName = req.body.firstName;
  if (req.body.lastName) user.lastName = req.body.lastName;
  if (req.body.password) user.password = req.body.password;
  if (req.body.role) user.role = req.body.role;

  if (user.wishesToManage && user.role === roles.MANAGER) {
    user.wishesToManage = false;
  }
  await user.save();

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});
exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.getMe = catchAsync(async (req, res, next) => {
  const userID = req.user._id;
  if (!userID) return next(new AppError('authentication failed', 401));
  const user = await User.findById(userID);

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});
