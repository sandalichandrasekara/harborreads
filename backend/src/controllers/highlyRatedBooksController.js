const axios = require('axios');

async function getHighlyRatedBooks(req,res) {
  try {
    // Make HTTP request to Google Books API
    const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
      params: {
        q: 'subject:fiction', // Example query to search for fiction books
        maxResults: 40, // Limit the number of results to 40
        printType: 'books', // Only fetch books
      }
    });
    

    // Filter books with a rating of 4 or higher
    const filteredBooks = response.data.items.filter(item => {
        // Check if the volumeInfo contains averageRating and it's greater than or equal to 4
        return item.volumeInfo.averageRating !== undefined && item.volumeInfo.averageRating >2;
      });
    
    // Extract relevant book information from the filtered books
    const books = filteredBooks.map(item => ({
      bookId: item.id,
      title: item.volumeInfo.title,

      authors: item.volumeInfo.authors,
      imageUrl: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : null,
      rating: item.volumeInfo.averageRating,
      // Add other relevant book information here
    }));
  
    res.json(books) ;
  } catch (error) {
    throw new Error('Failed to fetch highly rated books');
  }
}
module.exports = {
  getHighlyRatedBooks
};
