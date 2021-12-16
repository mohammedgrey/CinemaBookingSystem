const express = require('express');
const reservationController = require('../controllers/reservationController');
const protect = require('../controllers/middlewares/protect');
const permit = require('../controllers/middlewares/permit');

const router = express.Router();

router.get('/me', protect, reservationController.getMyReservations);
router
  .route('/')
  .get(protect, permit, reservationController.getAllReservations)
  .post(protect, reservationController.postReservation);
router
  .route('/:id')
  .get(protect, permit, reservationController.getReservation)
  .delete(protect, reservationController.deleteReservation);

module.exports = router;
