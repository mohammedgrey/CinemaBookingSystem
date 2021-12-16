const express = require('express');
const reservationController = require('../controllers/reservationController');
const protect = require('../controllers/middlewares/protect');
const permit = require('../controllers/middlewares/permit');

const router = express.Router();

router.use(protect, permit);

router.get('/me', reservationController.getMyReservations);
router.get('/movie/:id', reservationController.getMovieReservations);
router
  .route('/')
  .get(reservationController.getAllReservations)
  .post(reservationController.postReservation);
router
  .route('/:id')
  .get(reservationController.getReservation)
  .delete(reservationController.deleteReservation);

module.exports = router;
