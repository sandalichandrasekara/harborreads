// controllers/previewController.js

const axios = require('axios');

async function previewBooks(req, res) {
  const {bookId} = req.body;

  try {
    if (!bookId) {
      return res.status(400).json({ error: 'Missing required fields: userId, title' });
    }

    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`);

    const book = {
        id: response.data.id,
        title: response.data.volumeInfo.title,
        authors: response.data.volumeInfo.authors,
        imageUrl: response.data.volumeInfo.imageLinks ? response.data.volumeInfo.imageLinks.thumbnail : null,
        rating: response.data.volumeInfo.averageRating,
        genre: response.data.volumeInfo.categories,
        pageCount: response.data.volumeInfo.pageCount,
        year: response.data.volumeInfo.publishedDate,
        description: response.data.volumeInfo.description,
      };

    res.json(book);

  } catch (error) {
    console.error('Error finding book:', error);
    res.status(500).json({ error: 'An error occurred while finding books.' });
  }
}

module.exports = {
    previewBooks
};
