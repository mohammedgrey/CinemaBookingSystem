const multer = require('multer');
const sharp = require('sharp');
const User = require('./../models/userModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

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

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

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

//to change the user photo
////////////////////////////////////////////////////
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});
exports.uploadPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/images/users/${req.file.filename}`);

  next();
});

exports.changeMyPhoto = catchAsync(async (req, res, next) => {
  const userID = req.user._id;
  if (!userID) return next(new AppError('authentication failed', 401));

  if (!req.file) return next(new AppError('please upload a photo', 400));
  // const user = await User.findById(userID);
  const image = req.file.filename;

  await User.findByIdAndUpdate(
    userID,
    { image },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    status: 'success',
    message: 'photo updated'
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  if (!req.body.name || !req.body.email || !req.body.birthdate) {
    return next(
      new AppError('The request must contain a name, email and birthdate', 400)
    );
  }
  const filteredBody = {
    name: req.body.name,
    email: req.body.email,
    birthdate: req.body.birthdate
  };

  await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    message: 'user updated'
  });
});
