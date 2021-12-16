const Movie = require('./../models/movieModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const { thereIsATimeSlotAvailable } = require('../utils/helpers');

exports.getAllMovies = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Movie.find({ date: { $gte: new Date() } }), {
    ...req.query
  })
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const movies = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: movies.length,
    data: {
      movies
    }
  });
});

exports.getMovie = catchAsync(async (req, res, next) => {
  const movieID = req.params.id;
  if (!movieID) return new AppError('Please provide an id', 400);

  const movie = await Movie.findById(movieID).populate('room');

  res.status(200).json({
    status: 'success',
    data: {
      movie
    }
  });
});

exports.postMovie = catchAsync(async (req, res, next) => {
  const allMovieDates = await Movie.find({ date: { $gte: new Date() } }).select(
    'startTime endTime'
  );
  const currentMovieDate = {
    startTime: req.body.startTime,
    endTime: req.body.endTime
  };

  const okayToAddMovie = thereIsATimeSlotAvailable(
    currentMovieDate,
    allMovieDates
  );

  if (!okayToAddMovie)
    return next(
      new AppError(
        'There is a time conflict between the movie you are trying to add and an already existing movie',
        400
      )
    );

  const movie = await Movie.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      movie
    }
  });
});

exports.updateMovie = catchAsync(async (req, res, next) => {
  const allMovieDates = await Movie.find({ date: { $gte: new Date() } }).select(
    'startTime endTime'
  );
  const currentMovieDate = {
    startTime: req.body.startTime,
    endTime: req.body.endTime
  };

  const okayToAddMovie = thereIsATimeSlotAvailable(
    currentMovieDate,
    allMovieDates
  );

  if (!okayToAddMovie)
    return next(
      new AppError(
        'There is a time conflict between the movie you are trying to edit and an already existing movie',
        400
      )
    );

  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!movie) {
    return next(new AppError('No movie found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      movie
    }
  });
});

exports.deleteMovie = catchAsync(async (req, res, next) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);

  if (!movie) {
    return next(new AppError('No movie found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
