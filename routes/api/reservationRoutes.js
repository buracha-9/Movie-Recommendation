const express = require('express');
const router = express.Router();
const reservationController = require('../../controllers/reservationController');
const authMiddleware = require('../../middlewares/authMiddleware');

// Define routes for reservations
router.post('/reservations', authMiddleware.authenticate, reservationController.createReservation);
router.get('/reservations', authMiddleware.authenticate, reservationController.getAllReservations);
router.get('/reservations/:id', authMiddleware.authenticate, reservationController.getReservationById);
router.put('/reservations/:id', authMiddleware.authenticate, reservationController.updateReservation);
router.delete('/reservations/:id', authMiddleware.authenticate, reservationController.deleteReservation);

module.exports = router;
