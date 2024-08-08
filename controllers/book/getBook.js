const Book = require('../../models/Book');

const getBooks = async (req, res) => {
    try {
        const books = await Book.find({}).sort({ currentStock: -1 });
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Internal server error: ", error });
    }
}

module.exports = { getBooks };