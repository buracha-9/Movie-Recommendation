const pool = require('../config/db');

const Seat = {
  // Get all seats for a specific showtime
  getSeatsByShowtime: async (showtime_id) => {
    const [rows] = await pool.query('SELECT * FROM seats WHERE showtime_id = ?', [showtime_id]);
    return rows;
  },

  // Get a seat by ID
  getById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM seats WHERE id = ?', [id]);
    return rows[0];
  },

  // Book a seat (mark as reserved)
  bookSeat: async (seat_id) => {
    const [result] = await pool.query(
      'UPDATE seats SET is_booked = TRUE WHERE id = ? AND is_booked = FALSE',
      [seat_id]
    );
    return result;
  },

  // Unbook a seat (mark as available)
  unbookSeat: async (seat_id) => {
    const [result] = await pool.query(
      'UPDATE seats SET is_booked = FALSE WHERE id = ? AND is_booked = TRUE',
      [seat_id]
    );
    return result;
  }
};

module.exports = Seat;
