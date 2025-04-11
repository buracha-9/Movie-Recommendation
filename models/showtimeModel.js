const pool = require('../config/db');

const Showtime = {
  create: async (movie_id, start_time, room_id) => {
    const [result] = await pool.query(
      'INSERT INTO showtimes (movie_id, start_time, room_id) VALUES (?, ?, ?)',
      [movie_id, start_time, room_id]
    );
    return result;
  },

  // Check if a showtime already exists within a 2-hour window in the same room
  isConflict: async (start_time, room_id) => {
    const [rows] = await pool.query(
      `SELECT * FROM showtimes 
       WHERE room_id = ? 
       AND ABS(TIMESTAMPDIFF(MINUTE, start_time, ?)) < 120`,
      [room_id, start_time]
    );
    return rows.length > 0; // true if conflict exists
  }
};

module.exports = Showtime;
