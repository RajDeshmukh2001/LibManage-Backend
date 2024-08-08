const IssuedBooks = require("../../models/AssignedBooks");

const getIssuedBooks = async (req, res) => {
    try {
        const issuedBooks = await IssuedBooks.find({}).sort({ returned: 1 });
        res.status(200).json(issuedBooks);
    } catch (error) {
        res.status(500).json({ message: "Internal server error: ", error });
    }
}

module.exports = { getIssuedBooks }