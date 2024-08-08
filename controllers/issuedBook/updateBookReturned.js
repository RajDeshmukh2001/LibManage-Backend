const Book = require('../../models/Book');
const User = require('../../models/User');
const IssuedBooks = require("../../models/AssignedBooks");

const updateBookReturned = async (req, res) => {
    try {
        const { id } = await req.query;

        const issuedBook = await IssuedBooks.findById({ _id: id });
        let { book: { bookId }, user: { userId } } = issuedBook;

        const getBook = await Book.findById({ _id: bookId });
        const getUser = await User.findById({ _id: userId });

        if (issuedBook.returned === true) {
            return res.status(400).json({ message: "This book has already been marked as returned." });
        }

        if (getBook.currentStock === getBook.maximumStock) {
            return res.status(400).json({ message: "The book is currently at maximum stock capacity and cannot be returned at this moment." });
        }

        if (getUser.books_assigned === 0) {
            return res.status(400).json({ message: "This user has no books currently assigned." });
        }

        if (issuedBook && getBook && getUser) {
            await IssuedBooks.findByIdAndUpdate(id, { $set: { returned: true, paymentStatus: 'paid', daysRemaining: 0 } });
            await Book.findByIdAndUpdate(bookId, { $inc: { currentStock: 1 } });
            await User.findByIdAndUpdate(userId, { $inc: { books_assigned: -1 } });
        }

        return res.status(200).json({ message: "Status updated successfully!" });
    } catch (error) {
        res.status(500).json({ message: `Internal server error: ${error}` });
    }
}

module.exports = { updateBookReturned }