const express = require('express');
const router = express.Router();
const { getBooks } = require('../controllers/book/getBook');
const { getSingleBook } = require('../controllers/book/getSingleBook');

router.route('/').get(getBooks);
router.route('/:id').get(getSingleBook);

module.exports = router;