const pool = require('../config/db');

const Genre = {
  // Create a genre
  create: async (name) => {
    const [result] = await pool.query('INSERT INTO genres (name) VALUES (?)', [name]);
    return result;
  },

  // Get all genres
  getAll: async () => {
    const [rows] = await pool.query('SELECT * FROM genres');
    return rows;
  },

  // Get genre by ID
  getById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM genres WHERE id = ?', [id]);
    return rows[0];
  },

  // Update a genre
  update: async (id, name) => {
    const [result] = await pool.query('UPDATE genres SET name = ? WHERE id = ?', [name, id]);
    return result;
  },

  // Delete a genre
  delete: async (id) => {
    const [result] = await pool.query('DELETE FROM genres WHERE id = ?', [id]);
    return result;
  }
};

module.exports = Genre;
