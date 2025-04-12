const Reservation = require('../models/reservationModel');

// Create a reservation
exports.createReservation = async (req, res) => {
  const { user_id, showtime_id, seat_ids, status } = req.body;

  try {
    // Step 0: Check if any of the requested seats are already reserved for this showtime
    const alreadyReserved = await Reservation.checkDuplicateSeats(showtime_id, seat_ids);

    if (alreadyReserved.length > 0) {
      return res.status(409).json({
        message: 'Some seats are already reserved for this showtime',
        seats: alreadyReserved
      });
    }

    // Step 1: Create reservation record
    const result = await Reservation.create(user_id, showtime_id, status);

    // Step 2: Assign seats to the reservation
    if (seat_ids && seat_ids.length > 0) {
      await Reservation.reserveSeats(result.insertId, seat_ids);
    }

    res.status(201).json({
      message: 'Reservation created successfully!',
      reservationId: result.insertId
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating reservation' });
  }
};

// Get all reservations
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.getAll();
    res.status(200).json(reservations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching reservations' });
  }
};

// Get a reservation by ID
exports.getReservationById = async (req, res) => {
  const { id } = req.params;

  try {
    const reservation = await Reservation.getById(id);
    if (reservation) {
      res.status(200).json(reservation);
    } else {
      res.status(404).json({ message: 'Reservation not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching reservation' });
  }
};

// Update a reservation
exports.updateReservation = async (req, res) => {
  const { id } = req.params;
  const { user_id, showtime_id, status } = req.body;

  try {
    const result = await Reservation.update(id, user_id, showtime_id, status);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Reservation updated successfully' });
    } else {
      res.status(404).json({ message: 'Reservation not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating reservation' });
  }
};

// Delete a reservation
exports.deleteReservation = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Reservation.delete(id);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Reservation deleted successfully' });
    } else {
      res.status(404).json({ message: 'Reservation not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting reservation' });
  }
};
