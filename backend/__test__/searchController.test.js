//jest unit testing file for search controller
const axios = require('axios');
const { searchBooks, getSearchHistoryByUserId } = require('./searchController.test.js');
const SearchHistory = require('src/models/SearchHistory.js');

// Mocking axios.get function
jest.mock('axios');

describe('searchBooks', () => {
  it('should return books and store search history', async () => {
    const req = { body: { userId: 'user123', title: 'Harry Potter' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const responseData = {
      data: {
        items: [{
          id: 'book123',
          volumeInfo: {
            title: 'Harry Potter and the Philosopher\'s Stone',
            authors: ['J.K. Rowling'],
            imageLinks: { thumbnail: 'http://example.com/image.jpg' },
            averageRating: 4.5,
            categories: ['Fantasy'],
            publishedDate: '1997'
          }
        }]
      }
    };

    axios.get.mockResolvedValue(responseData);

    await searchBooks(req, res);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith([{
      bookId: 'book123',
      title: 'Harry Potter and the Philosopher\'s Stone',
      authors: ['J.K. Rowling'],
      imageUrl: 'http://example.com/image.jpg',
      rating: 4.5,
      genre: ['Fantasy'],
      year: '1997'
    }]);
    expect(SearchHistory.create).toHaveBeenCalledWith({ userId: 'user123', query: 'Harry Potter' });
  });

  it('should handle missing required fields', async () => {
    const req = { body: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await searchBooks(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Missing required fields: userId, title' });
    expect(SearchHistory.create).not.toHaveBeenCalled();
  });

  it('should handle error during book search', async () => {
    const req = { body: { userId: 'user123', title: 'Harry Potter' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    axios.get.mockRejectedValue(new Error('Failed to fetch data'));

    await searchBooks(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'An error occurred while searching books.' });
    expect(SearchHistory.create).not.toHaveBeenCalled();
  });
});

describe('getSearchHistoryByUserId', () => {
  it('should return search history', async () => {
    const req = { body: { userId: 'user123' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const searchHistory = [
      { userId: 'user123', query: 'Harry Potter', timestamp: new Date() }
    ];
    const responseData = {
      data: {
        items: [{
          id: 'book123',
          volumeInfo: {
            title: 'Harry Potter and the Philosopher\'s Stone',
            authors: ['J.K. Rowling'],
            imageLinks: { thumbnail: 'http://example.com/image.jpg' },
            averageRating: 4.5,
            categories: ['Fantasy'],
            publishedDate: '1997'
          }
        }]
      }
    };

    SearchHistory.find.mockResolvedValue(searchHistory);
    axios.get.mockResolvedValue(responseData);

    await getSearchHistoryByUserId(req, res);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({ searchHistory: [{
      bookId: 'book123',
      title: 'Harry Potter and the Philosopher\'s Stone',
      authors: ['J.K. Rowling'],
      imageUrl: 'http://example.com/image.jpg',
      rating: 4.5,
      genre: ['Fantasy'],
      year: '1997'
    }]});
  });

  it('should handle missing required field', async () => {
    const req = { body: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getSearchHistoryByUserId(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Missing required field: userId' });
  });

  it('should handle error getting search history', async () => {
    const req = { body: { userId: 'user123' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    SearchHistory.find.mockRejectedValue(new Error('Failed to fetch search history'));

    await getSearchHistoryByUserId(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'An error occurred while getting search history.' });
  });
});