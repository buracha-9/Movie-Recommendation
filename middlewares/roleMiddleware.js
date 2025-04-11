// rolemiddleware.js
// Middleware to check if the user has the 'admin' role
const verifyAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }
  next();
};

module.exports = { verifyAdmin }; // Export as an object
