// controllers/searchController.js

const axios = require('axios');
const SearchHistory = require('../models/SearchHistory');

async function searchBooks(req, res) {
  const { userId, title } = req.body;

  try {
    if (!userId || !title) {
      return res.status(400).json({ error: 'Missing required fields: userId, title' });
    }

    const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
      params: { q: `intitle:${title}` }
    });

    const books = response.data.items.map(item => ({
      bookId: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors,
      imageUrl: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : null,
      rating:item.volumeInfo.averageRating,
      genre:item.volumeInfo.categories,
      year:item.volumeInfo.publishedDate,
    }));

    // Store search history in the database
    await SearchHistory.create({ userId, query: title });

    res.json(books);
  } catch (error) {
    console.error('Error searching books:', error);
    res.status(500).json({ error: 'An error occurred while searching books.' });
  }
}
async function getSearchHistoryByUserId(req, res) {
  const { userId } = req.body;

  try {
    if (!userId) {
      return res.status(400).json({ error: 'Missing required field: userId' });
    }

    const searchHistory = await SearchHistory.find({ userId }).sort({ timestamp: -1 }).limit(6);

    const historyBooks = [];
    for (const history of searchHistory) {
      const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
        params: { q: `intitle:${history.query}` }
      });

      const bookData = response.data.items[0].volumeInfo;
      const book = {
        bookId: response.data.items[0].id,
        title: bookData.title,
        authors: bookData.authors,
        imageUrl: bookData.imageLinks ? bookData.imageLinks.thumbnail : null,
        rating: bookData.averageRating,
        genre: bookData.categories,
        year: bookData.publishedDate,
        
      };
      historyBooks.push(book);
    }

    res.json({ searchHistory: historyBooks });
  } catch (error) {
    console.error('Error getting search history:', error);
    res.status(500).json({ error: 'An error occurred while getting search history.' });
  }
}




module.exports = {
  searchBooks,
  getSearchHistoryByUserId
};
