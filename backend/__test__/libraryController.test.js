const {
  getUserShelves,
  updateUserShelves,
  addShelf,
  removeShelf,
  addBookToShelf,
  removeBookFromShelf,
  changeStatus,
} = require('../src/controllers/libraryController');

const mongoose = require('mongoose');

// Define mockUser outside of the jest.mock() call
const mockUser = {
  _id: new mongoose.Types.ObjectId(),
  shelves: ['456', '789'],
  defaultShelf: '456',
};

// Mock the User model
jest.mock('../src/models/User', () => {
  const mongoose = require('mongoose');

  const mockUser = {
    _id: new mongoose.Types.ObjectId(),
    shelves: ['456', '789'],
    defaultShelf: '456',
  };

  const mockQuery = {
    populate: jest.fn().mockReturnThis(),
    exec: jest.fn().mockResolvedValue(mockUser),
  };

  return {
    findById: jest.fn().mockReturnValue(mockQuery),
  };
});

// Mock the Shelf and Book models
jest.mock('../src/models/Library', () => ({
  Shelf: jest.fn(),
  Book: jest.fn(),
}));

// Mock data
const mockShelves = [
  {
    _id: '456',
    name: 'Shelf 1',
    books: [],
  },
  {
    _id: '789',
    name: 'Shelf 2',
    books: [],
  },
];

// Mock request and response objects
const mockRequest = (body) => ({
  body,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('getUserShelves', () => {
  it('should return user shelves and default shelf', async () => {
    const req = mockRequest({ userId: '123' });
    const res = mockResponse();

    await getUserShelves(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      shelves: mockUser.shelves,
      defaultShelf: mockUser.defaultShelf,
    });
  });
});

describe('updateUserShelves', () => {
  it('should update user shelves and default shelf', async () => {
    const req = mockRequest({ userId: '123', shelves: ['456', '789', 'abc'], defaultShelf: 'abc' });
    const res = mockResponse();

    await updateUserShelves(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Shelves updated successfully' });
  });
});

describe('addShelf', () => {
  it('should add a new shelf for the user', async () => {
    const req = mockRequest({ userId: '123', shelfName: 'New Shelf' });
    const res = mockResponse();

    await addShelf(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, userinfo: expect.any(Object) });
  });
});

describe('removeShelf', () => {
  it('should remove a shelf for the user', async () => {
    const req = mockRequest({ userId: '123', shelfId: '456' });
    const res = mockResponse();

    await removeShelf(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ shelves: expect.any(Array) });
  });
});

describe('addBookToShelf', () => {
  it('should add a book to a shelf', async () => {
    const req = mockRequest({ userId: '123', shelfId: '456', bookId: 'abc' });
    const res = mockResponse();

    await addBookToShelf(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Book added to shelf successfully' });
  });
});

describe('removeBookFromShelf', () => {
  it('should remove a book from a shelf', async () => {
    const req = mockRequest({ userId: '123', shelfId: '456', bookId: 'abc' });
    const res = mockResponse();

    await removeBookFromShelf(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ shelves: expect.any(Array) });
  });
});

describe('changeStatus', () => {
  it('should change the status of a book on a shelf', async () => {
    const req = mockRequest({ userId: '123', bookId: 'abc', newState: 'read' });
    const res = mockResponse();

    await changeStatus(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ book: expect.any(Object) });
  });
});
