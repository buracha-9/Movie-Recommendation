const pool = require('../config/db');

const Showtime = {
  create: async (movie_id, show_datetime, room_id, total_seats) => {
    const [result] = await pool.query(
      'INSERT INTO showtimes (movie_id, show_datetime, room_id, total_seats) VALUES (?, ?, ?, ?)',
      [movie_id, show_datetime, room_id, total_seats]
    );
    return result;
  },

  // Check if a showtime already exists within a 2-hour window in the same room
  isConflict: async (show_datetime, room_id) => {
    const [rows] = await pool.query(
      `SELECT * FROM showtimes 
       WHERE room_id = ? 
       AND ABS(TIMESTAMPDIFF(MINUTE, show_datetime, ?)) < 120`,
      [room_id, show_datetime]
    );
    return rows.length > 0;
  },

  // ✅ Optional: Get all showtimes
  getAll: async () => {
    const [rows] = await pool.query('SELECT * FROM showtimes');
    return rows;
  },

  // ✅ Optional: Get showtime by ID
  getById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM showtimes WHERE id = ?', [id]);
    return rows[0];
  }
};

module.exports = Showtime;
