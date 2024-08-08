const User = require('../../models/User');

const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).sort({ books_assigned: -1 });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: `Internal server error ${error}` });
    }
}

module.exports = { getUsers };