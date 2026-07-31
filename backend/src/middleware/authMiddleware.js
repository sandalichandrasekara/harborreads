const crypto = require('crypto');

// Generate a random secret key
const secretKey = crypto.randomBytes(32).toString('hex');

const authenticateUser = (req, res, next) => {
  // Check if the session contains user information
  if (req.session && req.session.user) {
    req.user = req.session.user;
    // User is authenticated, continue with the request
    next();
  } else {
    // User is not authenticated, redirect to login page or send unauthorized response
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = { authenticateUser, secretKey };
