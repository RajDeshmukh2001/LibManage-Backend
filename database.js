const mongoose = require('mongoose');

const dbConn = (URL) => {
    return mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}

module.exports = dbConn;