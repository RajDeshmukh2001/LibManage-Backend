const IssuedBooks = require("../../models/AssignedBooks");

const updateIssuedBooks = async (req, res) => {
    try {
        const issuedBooks = await IssuedBooks.find({ paymentStatus: 'pending' });

        for (let book of issuedBooks) {
            let { daysRemaining, fine, extraRent } = book;

            if (daysRemaining > 0) {
                daysRemaining = Math.max(daysRemaining - 1, 0);
            }

            if (daysRemaining === 0) {
                extraRent = extraRent + fine;
                totalRent = totalRent + fine;
            }

            book.daysRemaining = daysRemaining;
            book.extraRent = extraRent;
            book.totalRent = totalRent;
            await book.save();
        }

        res.status(200);
    } catch (error) {
        res.status(500).json({ message: "Internal server error: ", error });
    }
}

module.exports = { updateIssuedBooks };