// __test__/previewController.test.js

const axios = require('axios');
const { previewBooks } = require('../src/controllers/previewController');

jest.mock('axios');

//test case 1 - checks if book preview is given for a given bookId
describe('Preview Controller', () => {
  test('should return book details when bookId is provided', async () => {
    const bookId = 'bookId';
    const mockResponse = {
      data: {
        id: 'bookId',
        volumeInfo: {
          title: 'Book Title',
          authors: ['Author 1', 'Author 2'],
          imageLinks: { thumbnail: 'https://example.com/image.jpg' },
          averageRating: 4.5,
          categories: ['Fiction'],
          pageCount: 300,
          publishedDate: '2022-01-01',
          description: 'Book description', 
        },
      },
    };

    axios.get.mockResolvedValue(mockResponse);

    const req = { body: { bookId } };
    const res = { json: jest.fn() };

    await previewBooks(req, res);

    expect(res.json).toHaveBeenCalledWith({
      id: 'bookId',
      title: 'Book Title',
      authors: ['Author 1', 'Author 2'],
      imageUrl: 'https://example.com/image.jpg',
      rating: 4.5,
      genre: ['Fiction'],
      pageCount: 300,
      year: '2022-01-01',
      description: 'Book description', // Add description here
    });
  });

  //test case 2 - checks if it properly handles if bookid is missing
  test('should return 400 if bookId is missing', async () => {
    const req = { body: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await previewBooks(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Missing required fields: userId, title' });
  });
  
});
