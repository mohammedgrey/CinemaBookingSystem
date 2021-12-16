const express = require('express');
const movieController = require('./../controllers/movieController');
const protect = require('./../controllers/middlewares/protect');
const permit = require('./../controllers/middlewares/permit');
const savePhoto = require('../controllers/middlewares/savePhoto');

const router = express.Router();

router
  .route('/')
  .get(movieController.getAllMovies)
  .post(protect, permit, savePhoto, movieController.postMovie);

router
  .route('/:id')
  .get(movieController.getMovie)
  .put(protect, permit, savePhoto, movieController.updateMovie)
  .delete(protect, permit, movieController.deleteMovie);

module.exports = router;
