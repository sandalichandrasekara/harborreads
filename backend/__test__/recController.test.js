//this test files does jest unit tesing for the rec algorithm
const { MongoClient } = require('mongodb');
const natural = require('natural');
const { TfIdf } = natural;
const { getBestMatch, connectToMongoDB } = require('../src/controllers/recController/cosineCalcController');

jest.mock('mongodb', () => ({
  MongoClient: jest.fn().mockImplementation(() => ({
    connect: jest.fn(),
    close: jest.fn(),
    db: jest.fn(() => ({
      collection: jest.fn(() => ({
        find: jest.fn(() => ({
          forEach: jest.fn((callback) => {
            callback({
              title: 'Book 1',
              description: 'This is the description of Book 1',
            });
            callback({
              title: 'Book 2',
              description: 'This is the description of Book 2',
            });
          }),
        })),
      })),
    })),
  })),
}));

describe('connectToMongoDB', () => {
  //test case 1 - checks the mongodb connection 
  it('should connect to MongoDB and return book descriptions', async () => {
    const bookDescriptions = await connectToMongoDB();
    expect(bookDescriptions).toHaveLength(2);
    expect(bookDescriptions).toContainEqual({
      title: 'Book 1',
      description: 'This is the description of Book 1',
    });
    expect(bookDescriptions).toContainEqual({
      title: 'Book 2',
      description: 'This is the description of Book 2',
    });
  });
});

describe('getBestMatch', () => {
  //test case 22 - finding the best match
  it('should find the best match book for a given conversation', async () => {
    const req = {
      body: {
        conversation: 'This is a conversation about Book 1',
      },
    };
    const res = {
      json: jest.fn(),
    };

    await getBestMatch(req, res);

    expect(res.json).toHaveBeenCalledWith({
      bestMatchBook: {
        title: 'Book 1',
        description: 'This is the description of Book 1',
      },
    });
  });
});