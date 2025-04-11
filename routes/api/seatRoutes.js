const express = require('express');
const router = express.Router();
const seatsController = require('../../controllers/seatController');
const authMiddleware = require('../../middlewares/authMiddleware');

// Define routes for seats
router.get('/seats/showtime/:showtime_id', authMiddleware.authenticate, seatsController.getSeatsByShowtime);
router.get('/seats/:id', authMiddleware.authenticate, seatsController.getSeatById);
router.put('/seats/book/:seat_id', authMiddleware.authenticate, seatsController.bookSeat);
router.put('/seats/unbook/:seat_id', authMiddleware.authenticate, seatsController.unbookSeat);

module.exports = router;
