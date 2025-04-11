const pool = require('../config/db');

const Reservation = {
  // Create a reservation
  create: async (user_id, showtime_id) => {
    const [result] = await pool.query(
      'INSERT INTO reservations (user_id, showtime_id) VALUES (?, ?)',
      [user_id, showtime_id]
    );
    return result;
  },

  // Reserve seats for a reservation
  reserveSeats: async (reservation_id, seat_ids) => {
    const values = seat_ids.map(seat_id => [reservation_id, seat_id]);
    const [result] = await pool.query(
      'INSERT INTO reservation_seats (reservation_id, seat_id) VALUES ?',
      [values]
    );
    return result;
  },

  // Check if any requested seat_ids are already reserved for a showtime
  checkDuplicateSeats: async (showtime_id, seat_ids) => {
    if (!seat_ids || seat_ids.length === 0) return [];

    const placeholders = seat_ids.map(() => '?').join(', ');
    const [rows] = await pool.query(
      `
      SELECT seat_id FROM reservation_seats rs
      JOIN reservations r ON rs.reservation_id = r.id
      WHERE r.showtime_id = ? AND rs.seat_id IN (${placeholders})
      `,
      [showtime_id, ...seat_ids]
    );

    return rows.map(row => row.seat_id);
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
