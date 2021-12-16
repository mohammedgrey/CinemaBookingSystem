const express = require('express');
const roomController = require('./../controllers/roomController');
const protect = require('./../controllers/middlewares/protect');
const permit = require('./../controllers/middlewares/permit');

const router = express.Router();

router.use(protect, permit);

router
  .route('/')
  .get(roomController.getAllRooms)
  .post(roomController.postRoom);
router
  .route('/:id')
  .get(roomController.getRoom)
  .put(roomController.updateRoom)
  .delete(roomController.deleteRoom);

module.exports = router;
