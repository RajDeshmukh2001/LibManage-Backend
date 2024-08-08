const express = require('express');
const cors = require('cors');
const dbConn = require('./database');
const userRouter = require('./routes/users');
const bookRouter = require('./routes/books');
const issueBookRouter = require('./routes/issuedBooks');

const app = express();
require('dotenv').config();

app.use(express.json());
app.use(cors());
const PORT = 3000;

app.use('/api/users', userRouter);
app.use('/api/books', bookRouter);
app.use('/api/issuedBooks', issueBookRouter);

const databaseConnection = async () => {
    try {
        await dbConn(process.env.DATABASE_URI);
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Database connection error:', error);
    }
}

databaseConnection();