const Seat = require('../models/seatModel');

// Get all seats for a specific showtime
exports.getSeatsByShowtime = async (req, res) => {
  const { showtime_id } = req.params;

  try {
    const seats = await Seat.getSeatsByShowtime(showtime_id);
    res.status(200).json(seats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching seats' });
  }
};

// Get a seat by ID
exports.getSeatById = async (req, res) => {
  const { id } = req.params;

  try {
    const seat = await Seat.getById(id);
    if (seat) {
      res.status(200).json(seat);
    } else {
      res.status(404).json({ message: 'Seat not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching seat' });
  }
};

// Mark a seat as booked
exports.bookSeat = async (req, res) => {
  const { seat_id } = req.params;

  try {
    const result = await Seat.bookSeat(seat_id);
    res.status(200).json({ message: 'Seat booked successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Mark a seat as available (unbook it)
exports.unbookSeat = async (req, res) => {
  const { seat_id } = req.params;

  try {
    const result = await Seat.unbookSeat(seat_id);
    res.status(200).json({ message: 'Seat unbooked successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
