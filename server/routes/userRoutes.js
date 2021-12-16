const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const protect = require('./../controllers/middlewares/protect');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/me', protect, userController.getMe);
router.get('/', userController.getAllUsers);

router.patch('/me/update', protect, userController.updateMe);
router.patch('/me/updatepassword', protect, authController.updatePassword);

router
  .route('/:id')
  .get(userController.getUserProfile)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
