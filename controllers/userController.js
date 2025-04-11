const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// Create a user (for registration)
exports.createUser = async (req, res) => {
  const { username, email, password, role = 'user' } = req.body; // Default to 'user' if no role is provided

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user with the hashed password and default role if not provided
    const result = await User.create(username, email, hashedPassword, role);
    res.status(201).json({ message: 'User created successfully!', userId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating user' });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.getById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching user' });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password, role = 'user' } = req.body; // Default to 'user' if no role is provided

  try {
    // If password is provided, hash it before updating
    let hashedPassword = password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Update the user with the hashed password and role (default 'user' if not provided)
    const result = await User.update(id, username, email, hashedPassword, role);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'User updated successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating user' });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await User.delete(id);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting user' });
  }
};
