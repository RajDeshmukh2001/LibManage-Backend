const mongoose = require('mongoose');

const assignedBookSchema = new mongoose.Schema(
    {
        book: {
            bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
            title: { type: String, required: true },
            rent: { type: Number, required: true },
        },
        user: {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            name: { type: String, required: true },
        },
        issuedOnDate: { type: Date, required: true, default: Date.now },
        issuedTillDate: { type: Date, required: true },
        daysIssued: { type: Number, required: true },
        daysRemaining: { type: Number },
        fine: { type: Number, required: true },
        extraRent: { type: Number, default: 0 },
        totalRent: { type: Number },
        paymentStatus: { type: String },
        returned: { type: Boolean, default: false }
    },
    {
        timestamps: true,
    }
)

const IssuedBooks = mongoose.models.IssuedBooks || mongoose.model('IssuedBooks', assignedBookSchema);
module.exports = IssuedBooks;