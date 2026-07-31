const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Book schema
const bookSchema = new Schema({
  title: { type: String, required: true },
  bookId:{type: String, required: true },
  author: { type: [String]},
  genre: { type: [String] },
  pageCount: { type: Number },
  publishedDate: { type: Date },
  description: { type: String },
  imageUrl: { type: String },
  rating: { type: Number },
  isbn: { type: String },
  state: { type: String, enum: ['read', 'reading', 'wantToRead'], default: 'wantToRead' },
});

// Define the Shelf schema
const shelfSchema = new Schema({
  name: { type: String, required: true },
  books: [{ type: Schema.Types.ObjectId, ref: 'Book', default: [] }],
});


// Create models for Book, Shelf, and User
const Book = mongoose.model('Book', bookSchema);
const Shelf = mongoose.model('Shelf', shelfSchema);

module.exports = { Book, Shelf};
