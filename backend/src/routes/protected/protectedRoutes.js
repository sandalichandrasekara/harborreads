const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../../middleware/authMiddleware');


router.get('/', authenticateUser, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
