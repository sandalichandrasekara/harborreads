const User = require('../models/User'); // Assuming your user model file is in the models directory
const {Shelf,Book}= require('../models/Library');
const ReadingSights = require('../models/readingInsights');



exports.getUserShelves = async (req, res) => {
    const { userId } = req.body;
  
    try {
      const user = await User.findById(userId)
                              .populate('defaultShelf')
                              .populate('shelves')
                              .exec();
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      //console.log({ shelves: user.shelves, defaultShelf:user.defaultShelf });

      res.status(200).json({ shelves: user.shelves, defaultShelf:user.defaultShelf });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };


  exports.updateUserShelves = async (req, res) => {
    const { shelves, userId } = req.body;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Convert the array of shelf objects to an array of shelf IDs
      const shelfIds = shelves.map(shelf => shelf._id);
  
      // Update shelves
      user.shelves = shelfIds;
  
      // Update default shelf id
      user.defaultShelf = shelves[0]._id;
  
      await user.save();
  
      res.status(200).json({ message: 'Shelves updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };

  
  exports.addShelf = async (req, res) => {
    const { userId, shelfName } = req.body;
  
    // Find the user by userId (you need to implement this logic)
    const user = await User.findById(userId);
  
    // Create a new shelf object
    const newShelf = new Shelf({ name: shelfName, books:[]  });
    await newShelf.save();
    await user.save();

    // Push the new shelf object to the user's shelves
    user.shelves.push(newShelf);
  
    await user.save();
  
    res.json({ success: true, userinfo:user.populate('shelves') });
  };

  exports.removeShelf = async (req, res) => {
    const { userId, shelfId } = req.body;

    try {
        // Delete the shelf with the given shelfId
        await Shelf.deleteOne({ _id: shelfId });

        // Find the user by userId and remove the shelfId from the shelves array
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.shelves = user.shelves.filter((shelf) => shelf._id.toString() !== shelfId);
        await user.save();

        // Return the updated user object with the shelf removed
        res.json({ shelves: user.shelves });
    } catch (error) {
        console.error('Error removing shelf:', error);
        res.status(500).json({ error: 'Failed to remove shelf' });
    }
};

exports.addBookToShelf = async (req, res) => {
    const { userId, shelfId, bookDetails } = req.body;

    try {
        // Find the shelf by shelfId
        const shelf = await Shelf.findById(shelfId);
        if (!shelf) {
            return res.status(404).json({ error: 'Shelf not found' });
        }

        // Create a new Book object
        const newBook = new Book({
            title: bookDetails.title,
            bookId: bookDetails.id,
            author: bookDetails.authors,
            genre: bookDetails.genre,
            pageCount: bookDetails.pageCount,
            publishedDate: bookDetails.year,
            imageUrl: bookDetails.imageUrl,
            rating: bookDetails.rating,
        });

        // Save the new book to the database
        await newBook.save();

        // Add the book's _id to the shelf's books array
        shelf.books.push(newBook._id);
        await shelf.save();

        // Find the user by userId
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the user's shelves array if the book is successfully added to the shelf
        user.shelves = user.shelves.map((s) => {
            if (s._id.toString() === shelfId) {
                return shelf;
            } else {
                return s;
            }
        });

        // Save the user with the updated shelf
        await user.save();

        res.json({ message: 'Book added to shelf successfully' });
    } catch (error) {
        console.error('Error adding book to shelf:', error);
        res.status(500).json({ error: 'Failed to add book to shelf' });
    }
};

exports.removeBookFromShelf = async (req, res) => {
    const { userId, shelfIndex, bookToRemoveId } = req.body;
    //console.log( userId, shelfIndex, bookToRemoveId);

    try {
        
        // Find the shelf by shelfId
        const shelf = await Shelf.findOne(shelfIndex);
        

        if (!shelf) {
            return res.status(404).json({ error: 'Shelf not found' });
        }

        // Remove the book from the shelf's books array
        shelf.books = shelf.books.filter(book => book.toString() !== bookToRemoveId);

        // Save the updated shelf
        await shelf.save();

        /// Find the user by userId and update the shelves array with the updated shelf
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.shelves = user.shelves.map(s => (s._id.toString() === shelfIndex._id ? shelf : s));
        await user.save();

        // Populate the shelves before returning them
        await user.populate('shelves');
        await user.populate('defaultShelf');


        //console.log(user.shelves,user.defaultShelf);
        // Return the updated user object
        res.json({ shelves: user.shelves, defaultShelf:user.defaultShelf});

    } catch (error) {
        console.error('Error removing book from shelf:', error);
        res.status(500).json({ error: 'Failed to remove book from shelf' });
    }
};

exports.changeStatus = async (req, res) => {
    const { bookId, newState, username } = req.body;
    console.log( bookId, newState, username);
  
    try {
      // Find the book by bookId
      const book = await Book.findById(bookId);
  
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
  
      // Update the book's status
      book.state = newState;
  
      // Save the updated book
      await book.save();
  
      // Find the ReadingSights document for the user
      let readingSights = await ReadingSights.findOne({ username: username });
  
      // If the ReadingSights document doesn't exist, create a new one
      if (!readingSights) {
        readingSights = new ReadingSights({
          username: username,
          numberOfReadBooks: 1
        });
      } else {
        // If the newState is 'read', increment the numberOfReadBooks
        if (newState === 'read') {
          readingSights.numberOfReadBooks++;
        }
      }
  
      // Save the ReadingSights document
      await readingSights.save();
  
      // Return the updated book
      res.json({ book });
  
    } catch (error) {
      console.error('Error changing status:', error);
      res.status(500).json({ error: 'Failed to change status' });
    }
  };