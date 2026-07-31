const bcrypt = require('bcrypt');
const User = require('../models/User');
const {Shelf}=require('../models/Library');

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Check if username already exists
    const existingUserEmail = await User.findOne({ email });
    if (existingUserEmail) {
      return res.status(400).json({ error: 'Email already exists' });
    }


    const defaultShelf = new Shelf({ name: `${username}s Shelf`, books: [] });
    await defaultShelf.save();

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword ,defaultShelf:defaultShelf._id});
    await user.save();

    // Create session upon successful signup
    req.session.user = { id: user._id, username: user.username };


    res.status(201).json({ message: 'User created successfully', session: req.session});
  } catch (err) {
    res.status(500).json({ error: ' hey Internal server error' });
  }
};

exports.signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password', path:'/signin' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid username or password', path:'/signin' });
    }

    // Create session upon successful signin
    req.session.user = { id: user._id, username: user.username};
    res.json({ message: 'Login successful' , userSession: req.session});
    console.log(req.session);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

