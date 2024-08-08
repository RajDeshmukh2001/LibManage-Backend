const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({}, { collection: 'books', strict: false });

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;