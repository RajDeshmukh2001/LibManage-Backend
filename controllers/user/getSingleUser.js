const User = require('../../models/User');

const getSingleUser = async (req, res) => {
    try {
        const id = await req.params.id;
        const user = await User.findById({ _id: id });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: `Internal server error ${error}` });
    }
}

module.exports = { getSingleUser };