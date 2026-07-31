const axios = require('axios');
const { getHighlyRatedBooks } = require('../src/controllers/highlyRatedBooksController');

// Mocking the axios.get method to simulate the API response 
jest.mock('axios');  // java script libarray to send request to api , used during backend formation 

describe('Highly Rated Books Controller', () => {             // describe block defines a test suite for the highly rated books controller
  // Test case for successful retrieval of highly rated books test case 1 
  it('should fetch highly rated books', async () => {
    // Mocked response data from the Google Books API
    const responseData = {
      data: {
        items: [
          {
            id: 'book1',
            volumeInfo: {
              title: 'Book 1',
              authors: ['Author 1'],
              imageLinks: { thumbnail: 'image1.jpg' },
              averageRating: 5.0,
            },
          },
          {
            id: 'book2',
            volumeInfo: {
              title: 'Book 2',
              authors: ['Author 2'],
              imageLinks: { thumbnail: 'image2.jpg' },
              averageRating: 5.0,
            },
          },
        ],
      },
    };

    // Mocking the axios.get method to return the mocked response
    axios.get.mockResolvedValue(responseData);

    // Mock response object
    const res = {
      json: jest.fn(),
    };

    // Call the controller function
    await getHighlyRatedBooks({}, res);

    // Check if the response JSON method is called with the expected data
    expect(res.json).toHaveBeenCalledWith([
      {
        bookId: 'book1',
        title: 'Book 1',
        authors: ['Author 1'],
        imageUrl: 'image1.jpg',
        rating: 5.0,
      },
      {
        bookId: 'book2',
        title: 'Book 2',
        authors: ['Author 2'],
        imageUrl: 'image2.jpg',
        rating: 5.0,
      },
    ]);
  });

  // Test case for handling errors  test case 2
  it('should throw an error if fetching highly rated books fails', async () => {
    // Mocking the axios.get method to simulate an error
    axios.get.mockRejectedValue(new Error('Failed to fetch highly rated books'));

    // Mock response object
    const res = {
      json: jest.fn(),
    };

    // Call the controller function
    await expect(getHighlyRatedBooks({}, res)).rejects.toThrow('Failed to fetch highly rated books');

    // this statement Checks if the response JSON method is not called
    expect(res.json).not.toHaveBeenCalled();
  });
});
