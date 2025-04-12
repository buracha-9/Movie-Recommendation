const pool = require('../config/db');

const Reservation = {
  // Create a reservation
  create: async (user_id, showtime_id, status = 'active') => {
    // Ensure status is either 'active' or 'cancelled'
    if (status !== 'active' && status !== 'cancelled') {
      throw new Error("Invalid status value. Only 'active' or 'cancelled' are allowed.");
    }

    const [result] = await pool.query(
      'INSERT INTO reservations (user_id, showtime_id, status) VALUES (?, ?, ?)',
      [user_id, showtime_id, status]
    );
    return result;
  },

  // Reserve seats for a reservation by updating the seats table
  reserveSeats: async (reservation_id, seat_ids) => {
    const values = seat_ids.map(seat_id => [reservation_id, seat_id]);
    const [result] = await pool.query(
      'UPDATE seats SET reservation_id = ? WHERE id IN (?)',
      [reservation_id, seat_ids]
    );
    return result;
  },

  // Check if any requested seat_ids are already reserved for a showtime
  checkDuplicateSeats: async (showtime_id, seat_ids) => {
    if (!seat_ids || seat_ids.length === 0) return [];

    const placeholders = seat_ids.map(() => '?').join(', ');
    const [rows] = await pool.query(
      `SELECT id FROM seats
      WHERE showtime_id = ? AND reservation_id IS NOT NULL AND id IN (${placeholders})`,
      [showtime_id, ...seat_ids]
    );

    return rows.map(row => row.id);
  },

  // Get all reservations
  getAll: async () => {
    const [rows] = await pool.query('SELECT * FROM reservations');
    return rows;
  },

  // Get a reservation by ID
  getById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM reservations WHERE id = ?', [id]);
    return rows[0];
  },

  // Update a reservation
  update: async (id, user_id, showtime_id, status) => {
    // Ensure status is either 'active' or 'cancelled'
    if (status !== 'active' && status !== 'cancelled') {
      throw new Error("Invalid status value. Only 'active' or 'cancelled' are allowed.");
    }

    const [result] = await pool.query(
      'UPDATE reservations SET user_id = ?, showtime_id = ?, status = ? WHERE id = ?',
      [user_id, showtime_id, status, id]
    );
    return result;
  },

  // Delete a reservation
  delete: async (id) => {
    const [result] = await pool.query('DELETE FROM reservations WHERE id = ?', [id]);
    return result;
  }
};

module.exports = Reservation;
