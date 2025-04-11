const pool = require('../config/db');

const User = {
  // Create a user (register)
  create: async (username, email, password, role) => {
    const [result] = await pool.query(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
      [username, email, password, role]
    );
    return result;
  },

  // Get all users
  getAll: async () => {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
  },

  // Get user by ID
  getById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  },

  // 🔐 Get user by email (for login)
  findByEmail: async (email) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0]; // Only return the first match
  },

  // Update a user
  update: async (id, username, email, password, role) => {
    const [result] = await pool.query(
      'UPDATE users SET username = ?, email = ?, password = ?, role = ? WHERE id = ?',
      [username, email, password, role, id]
    );
    return result;
  },

  // Delete a user
  delete: async (id) => {
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
    return result;
  }
};

module.exports = User;
