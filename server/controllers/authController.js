// const crypto = require('crypto');
const jwt = require('jsonwebtoken');
// const { promisify } = require('util');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const roles = require('./data/roles');

// const AppError = require('./../utils/appError');

//helper functions
const createSendToken = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION_PERIOD
  });

  console.log('About to send token...');
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: false
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);
  // res.send(req.signedCookies);
  console.log('Token sent...');
  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  if (![roles.MANAGER, roles.CUSTOMER].includes(req.body.role))
    return next(
      new AppError(`You can not sign up as a/n ${req.body.role}`, 401)
    );
  if (req.body.role === roles.MANAGER) {
    req.body.role = roles.CUSTOMER;
    req.body.wishesToManage = true;
  }
  const newUser = await User.create(req.body);
  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //Check if the request is sent with an email and a password
  if (!email || !password)
    return next(new AppError('please provide an email and a password', 400));

  // Now try to find the user with the requested email
  const user = await User.findOne({ email: email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 2 * 1000),
    httpOnly: true
  });
  res.status(200).json({ status: 'success' });
};

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  // 3) If so, update password
  user.password = req.body.newPassword;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
});
