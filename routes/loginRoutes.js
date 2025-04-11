const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route for login
router.post('/login', authController.loginUser);

module.exports = router;
