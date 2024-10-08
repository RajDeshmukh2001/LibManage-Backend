const User = require("../../models/User");
const Book = require("../../models/Book");
const IssuedBooks = require("../../models/AssignedBooks");

const issueBook = async (req, res) => {
    try {
        const formData = await req.body;
        const { bookId, title, rent, userId, name, extraRent, issuedOnDate, issuedTillDate } = formData;

        if (!bookId || !title || !rent || !userId || !name || !extraRent || !issuedOnDate || !issuedTillDate) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const book = await Book.findById({ _id: bookId });
        const user = await User.findById({ _id: userId });

        if (!book || !user) {
            return res.status(404).json({ message: "Book or User not found." });
        }

        const bookAlreadyIssued = await IssuedBooks.findOne({
            $and: [
                { "book.bookId": bookId },
                { "user.userId": userId },
                { returned: false }
            ]
        });

        if (bookAlreadyIssued) {
            return res.status(400).json({ message: "The book is already issued to the user" });
        }

        if (book.currentStock === 0) {
            return res.status(400).json({ message: "Book is out of stock" });
        }

        if (user.books_assigned === 2) {
            return res.status(400).json({ message: "User has reached the maximum number of books assigned" });
        }

        const issuedOn = new Date(issuedOnDate);
        const issuedTill = new Date(issuedTillDate);
        const daysIssued = (issuedTill - issuedOn) / (1000 * 60 * 60 * 24);

        const issueBook = new IssuedBooks({
            book: {
                bookId,
                title,
                rent
            },
            user: {
                userId,
                name
            },
            issuedOnDate: issuedOn,
            issuedTillDate: issuedTill,
            daysIssued,
            daysRemaining: daysIssued,
            fine: extraRent,
            totalRent: rent,
            paymentStatus: "pending",
        });

        const bookIssued = await issueBook.save();

        if (bookIssued) {
            const updateStock = await Book.findByIdAndUpdate(bookId, { $inc: { currentStock: -1, noOfTimesRented: 1 } });
            const updateBooksAssigned = await User.findByIdAndUpdate(userId, { $inc: { books_assigned: 1 } });

            if (updateStock && updateBooksAssigned) {
                return res.status(200).json({ message: "Book issued successfully!", bookData: bookIssued });
            } else {
                return res.status(500).json({ message: "Failed to update book stock or user assignments." });
            }
        } else {
            return res.status(500).json({ message: "Failed to issue the book." });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error: ", error });
    }
}

module.exports = { issueBook }