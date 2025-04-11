const pool = require('../config/db');

const Movie = {
  // Create a movie
  create: async (title, description, poster_url, genre_id) => {
    const [result] = await pool.query(
      'INSERT INTO movies (title, description, poster_url, genre_id) VALUES (?, ?, ?, ?)',
      [title, description, poster_url, genre_id]
    );
    return result;
  },

  // Get all movies
  getAll: async () => {
    const [rows] = await pool.query('SELECT * FROM movies');
    return rows;
  },

  // Get movie by ID
  getById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM movies WHERE id = ?', [id]);
    return rows[0];
  },

  // Get movie by Title (to check for duplication)
  getByTitle: async (title) => {
    const [rows] = await pool.query('SELECT * FROM movies WHERE title = ?', [title]);
    return rows[0]; // Return the first match if any
  },

  // Update a movie
  update: async (id, title, description, poster_url, genre_id) => {
    const [result] = await pool.query(
      'UPDATE movies SET title = ?, description = ?, poster_url = ?, genre_id = ? WHERE id = ?',
      [title, description, poster_url, genre_id, id]
    );
    return result;
  },

  // Delete a movie
  delete: async (id) => {
    const [result] = await pool.query('DELETE FROM movies WHERE id = ?', [id]);
    return result;
  }
};

module.exports = Movie;
