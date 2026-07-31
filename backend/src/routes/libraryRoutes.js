const express = require('express');
const router = express.Router();
const {Book}=require('../models/Library')
const libraryController = require('../controllers/libraryController');

router.post('/shelves', libraryController.getUserShelves);
router.post('/saveShelves', libraryController.updateUserShelves);
router.post('/addShelf',libraryController.addShelf);
router.post('/removeShelf',libraryController.removeShelf);
router.post('/addBookToShelf',libraryController.addBookToShelf);
router.post('/removeBookFromShelf',libraryController.removeBookFromShelf);
router.post('/changeStatus',libraryController.changeStatus);
router.get('/book/:bookId', async (req, res) => {
    try {
      const book = await Book.findById(req.params.bookId);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.json(book);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });





module.exports = router;
