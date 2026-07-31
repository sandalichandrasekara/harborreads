//this is the test file for unit testing for profile controller

const UserProfile = require('../src/models/userProfile');
const User = require('../src/models/User');
const profileController = require('../src/controllers/profileController');

jest.mock('../models/userProfile');
jest.mock('../models/User');

describe('profileController', () => {
  describe('getUserDetails', () => {
    //test case 1
    it('should return user details', async () => {
      const mockUser = {
        _id: 'user123',
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      };
      User.findById.mockResolvedValue(mockUser);

      const userDetails = await profileController.getUserDetails('testuser');

      expect(User.findById).toHaveBeenCalledWith('testuser');
      expect(userDetails).toEqual({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      });
    });

    //test case 2
    it('should throw an error if user is not found', async () => {
      User.findById.mockResolvedValue(null);

      await expect(profileController.getUserDetails('nonexistentuser')).rejects.toThrow(
        'User not found'
      );
    });
  });

  describe('getEditProfileForm', () => {
    //test case 3
    it('should return userProfile and userDetails', async () => {
      const mockUserProfile = {
        _id: 'profile123',
        user: 'user123',
        gender: 'male',
        dob: new Date('1990-01-01'),
      };
      const mockUser = {
        _id: 'user123',
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      };
      UserProfile.findOne.mockResolvedValue(mockUserProfile);
      User.findById.mockResolvedValue(mockUser);

      const req = {
        body: {
          userSession: {
            user: {
              id: 'user123',
            },
          },
        },
      };
      const res = {
        json: jest.fn(),
      };

      await profileController.getEditProfileForm(req, res);

      expect(UserProfile.findOne).toHaveBeenCalledWith({ user: 'user123' });
      expect(User.findById).toHaveBeenCalledWith('user123');
      expect(res.json).toHaveBeenCalledWith({
        userProfile: mockUserProfile,
        userDetails: {
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123',
        },
      });
    });

    //test case 4
    it('should create a new userProfile if it does not exist', async () => {
      const mockUser = {
        _id: 'user123',
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      };
      UserProfile.findOne.mockResolvedValue(null);
      User.findById.mockResolvedValue(mockUser);
      const mockSave = jest.fn();
      UserProfile.mockImplementation(() => ({
        save: mockSave,
      }));

      const req = {
        body: {
          userSession: {
            user: {
              id: 'user123',
            },
          },
        },
      };
      const res = {
        json: jest.fn(),
      };

      await profileController.getEditProfileForm(req, res);

      expect(UserProfile).toHaveBeenCalledWith({
        user: 'user123',
        gender: '',
        dob: expect.any(Date),
      });
      expect(mockSave).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalled();
    });
  });
});