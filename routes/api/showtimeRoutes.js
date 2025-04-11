const express = require('express');
const router = express.Router();
const showtimeController = require('../../controllers/showtimeController');
const authMiddleware = require('../../middlewares/authMiddleware');

router.get('/showtimes', authMiddleware.authenticate, showtimeController.getAllShowtimes);
router.get('/showtimes/:id', authMiddleware.authenticate, showtimeController.getShowtimeById);
router.post('/showtimes', authMiddleware.authenticate, showtimeController.createShowtime);

module.exports = router;
