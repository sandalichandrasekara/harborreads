//This is the test file done using jest unit testing for sign in and sign up
const bcrypt = require('bcrypt');
const authController = require('../src/controllers/authController');
const User = require('../src/models/User');
const { Shelf } = require('../src/models/Library');

jest.mock('bcrypt');
jest.mock('../src/models/User');
jest.mock('../src/models/Library');

describe('Auth Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signup', () => {
    //test case 1 if user already exits
    it('should return 400 if username already exists', async () => {
      const req = { body: { username: 'existingUser', email: 'test@example.com', password: 'password' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      User.findOne.mockResolvedValueOnce({ username: 'existingUser' });

      await authController.signup(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Username already exists' });
    });

    //test case 2 if email already exits
    it('should return 400 if email already exists', async () => {
      const req = { body: { username: 'newUser', email: 'existing@example.com', password: 'password' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      User.findOne.mockResolvedValueOnce(null).mockResolvedValueOnce({ email: 'existing@example.com' });

      await authController.signup(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Email already exists' });
    });

    //test case 3 - default shelf creation
    it('should create a new user and default shelf', async () => {
      const req = { body: { username: 'newUser', email: 'new@example.com', password: 'password' }, session: {} };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      User.findOne.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue('hashedPassword');
      const mockUser = { _id: 'mockUserId', username: 'newUser', save: jest.fn() };
      const mockShelf = { _id: 'mockShelfId', name: 'newUsers Shelf', books: [], save: jest.fn() };
      User.mockImplementationOnce(() => mockUser);
      Shelf.mockImplementationOnce(() => mockShelf);

      await authController.signup(req, res);

      expect(Shelf).toHaveBeenCalledWith({ name: 'newUsers Shelf', books: [] });
      expect(mockShelf.save).toHaveBeenCalled();
      expect(bcrypt.hash).toHaveBeenCalledWith('password', 10);
      expect(User).toHaveBeenCalledWith({ username: 'newUser', email: 'new@example.com', password: 'hashedPassword', defaultShelf: 'mockShelfId' });
      expect(mockUser.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'User created successfully', session: req.session });
    });
  });

  describe('signin', () => {
    //test case 4 - user not found
    it('should return 401 if user not found', async () => {
      const req = { body: { username: 'nonExistingUser', password: 'password' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      User.findOne.mockResolvedValue(null);

      await authController.signin(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid username or password', path: '/signin' });
    });

    //test case 5 - password incorrect
    it('should return 401 if password is incorrect', async () => {
      const req = { body: { username: 'existingUser', password: 'wrongPassword' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const mockUser = { password: 'hashedPassword' };
      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false);

      await authController.signin(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid username or password', path: '/signin' });
    });

    //test case 6 - session creation
    it('should create a session and return success message', async () => {
      const req = { body: { username: 'existingUser', password: 'validPassword' }, session: {} };
      const res = { json: jest.fn() };
      const mockUser = { _id: 'mockUserId', username: 'existingUser', password: 'hashedPassword' };
      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);

      await authController.signin(req, res);

      expect(req.session.user).toEqual({ id: 'mockUserId', username: 'existingUser' });
      expect(res.json).toHaveBeenCalledWith({ message: 'Login successful', userSession: req.session });
    });
  });
});
