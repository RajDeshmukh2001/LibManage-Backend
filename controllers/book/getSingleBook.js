const Book = require('../../models/Book');

const getSingleBook = async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findById({ _id: id });
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: "Internal server error: ", error });
    }
}

module.exports = { getSingleBook };