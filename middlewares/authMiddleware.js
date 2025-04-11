// authmiddleware.js
const jwt = require('jsonwebtoken');

// Middleware to validate JWT token
const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Assuming token is passed in the format "Bearer <token>"

  if (!token) {
    return res.status(403).json({ message: 'Token is required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    // Attach user information to request for use in the route handler
    req.user = decoded;
    next();
  });
};

module.exports = { authenticate };
