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
    try {
      // Try to book the seat by checking if it is not already booked
      const [result] = await pool.query(
        'UPDATE seats SET is_booked = TRUE WHERE id = ? AND is_booked = FALSE',
        [seat_id]
      );
      
      // Check if any rows were updated
      if (result.affectedRows === 0) {
        throw new Error('Seat not found or already booked.');
      }
      return result;
    } catch (error) {
      console.error(error);
      throw new Error('Error booking the seat.');
    }
  },

  // Unbook a seat (mark as available)
  unbookSeat: async (seat_id) => {
    try {
      // Try to unbook the seat by checking if it is already booked
      const [result] = await pool.query(
        'UPDATE seats SET is_booked = FALSE WHERE id = ? AND is_booked = TRUE',
        [seat_id]
      );
      
      // Check if any rows were updated
      if (result.affectedRows === 0) {
        throw new Error('Seat not found or already available.');
      }
      return result;
    } catch (error) {
      console.error(error);
      throw new Error('Error unbooking the seat.');
    }
  },

  // ✅ Create a seat
  create: async (showtime_id, seat_number) => {
    const [result] = await pool.query(
      'INSERT INTO seats (showtime_id, seat_number, is_booked) VALUES (?, ?, FALSE)',
      [showtime_id, seat_number]
    );
    return result;
  },

  // Update seat details (showtime_id, seat_number, and is_booked)
  updateSeat: async (id, showtime_id, seat_number, is_booked) => {
    const [result] = await pool.query(
      'UPDATE seats SET showtime_id = ?, seat_number = ?, is_booked = ? WHERE id = ?',
      [showtime_id, seat_number, is_booked, id]
    );
    return result;
  }
};

module.exports = Seat;
