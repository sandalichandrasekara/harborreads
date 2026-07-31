const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');

router.use(cookieParser());

router.post('/username', (req, res) => {
    const {userSession}=req.body;
    console.log(userSession);
    // Check if user is authenticated
    if (userSession.user) {
      // User is authenticated, return username
      res.json(userSession.user.username);
    } else {
      // User is not authenticated, return 401 Unauthorized
      res.status(401).json({ message: 'Unauthorized' });
    }
  });

module.exports = router;
