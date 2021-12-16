const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const protect = require('./../controllers/middlewares/protect');
const permit = require('./../controllers/middlewares/permit');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/me', protect, userController.getMe);
router.get('/', protect, permit, userController.getAllUsers);

router.put('/me/updatepassword', protect, authController.updatePassword);

router
  .route('/:id')
  .get(protect, permit, userController.getUserProfile)
  .put(protect, permit, userController.updateUser)
  .delete(protect, permit, userController.deleteUser);

module.exports = router;
