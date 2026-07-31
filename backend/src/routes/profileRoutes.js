// profileRoutes.js
const express = require('express');
const router = express.Router();
const { getEditProfileForm, updateProfile } = require('../controllers/profileController');

// Route to display edit profile form
router.post('/edit-profile-info', getEditProfileForm);

// Route to handle profile update
router.post('/edit-profile', updateProfile);

module.exports = router;
