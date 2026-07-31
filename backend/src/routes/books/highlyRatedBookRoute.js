// routes/highlyRatedBooks.js

const express = require('express');
const router = express.Router();
const highlyRatedBooksController = require('../../controllers/highlyRatedBooksController');

// Define route for fetching highly rated books
router.get('/highly-rated-books', highlyRatedBooksController.getHighlyRatedBooks);

module.exports = router;
