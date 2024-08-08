const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({}, { collection: 'users', strict: false });

const User = mongoose.model('User', userSchema);
module.exports = User