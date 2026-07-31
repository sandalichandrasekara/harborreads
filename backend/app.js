const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { authenticateUser, secretKey } = require('./src/middleware/authMiddleware');
const authRoutes = require('./src/routes/auth');
const bookRouter = require('./src/routes/books/bookRoutes');
const ratedBookRouter = require('./src/routes/books/highlyRatedBookRoute');
const profileRouter = require('./src/routes/profileRoutes');
const chatRouter=require('./src/routes/chatRoutes');
const userNameRouter=require('./src/routes/userRoutes');
const recRouter=require('./src/routes/recRoutes');
const libraryRouter=require( './src/routes/libraryRoutes');
const insightRouter=require('./src/routes/readingInsightRoutes');
const leaderboardRouter=require('./src/routes/leaderboardRoutes');

require('./db');

const app = express();

// Enable CORS for all routes
app.use(cors());


app.use(cookieParser());
// Middleware
app.use(bodyParser.json());


// Session middleware configuration

app.use(session({
  name: 'session', // Set the cookie name to 'session_id'
  secret: secretKey,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: false,
    domain: 'localhost',
    path:'/',
    secure:false,
    SameSite:'None'
  },
}));



// Mounting authentication routes at /auth base URL
app.use('/auth', authRoutes);

// Mounting protected routes
app.use('/protected', authenticateUser, require('./src/routes/protected/protectedRoutes'));

// Mounting bookRouter at /books/search path
app.use('/books/search', bookRouter);

// Mounting bookRouter at /books/search path
app.use('/books/popular', ratedBookRouter);

// Mounting bookRouter at /books/search path
app.use('/chat', chatRouter);

// Mounting recRouter at /rec path
app.use('/rec',recRouter);

// Mounting userNameRouter at /user path
app.use('/user',userNameRouter);

// Mounting profileRouter at /profile
app.use('/profile', profileRouter);

// Mounting libraryRouter at /library
app.use('/library' ,libraryRouter);

// Mounting insightRouter at /insight
app.use('/insight' ,insightRouter);

// Mounting leaderboardRouter at /leaderboard
app.use('/leaderboard' ,leaderboardRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

