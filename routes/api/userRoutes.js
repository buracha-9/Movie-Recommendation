const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const authMiddleware = require('../../middlewares/authMiddleware');
const { verifyAdmin } = require('../../middlewares/roleMiddleware');

// Define routes for users
router.post('/users', userController.createUser);
router.get('/users', authMiddleware.authenticate, verifyAdmin, userController.getAllUsers);
router.get('/users/:id', authMiddleware.authenticate, verifyAdmin, userController.getUserById);
router.put('/users/:id', authMiddleware.authenticate, userController.updateUser);
router.delete('/users/:id', authMiddleware.authenticate, verifyAdmin, userController.deleteUser);

module.exports = router;
