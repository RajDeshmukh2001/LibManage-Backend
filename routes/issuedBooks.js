const express = require('express');
const router = express.Router();
const { issueBook } = require('../controllers/issuedBook/issueBook');
const { getIssuedBooks } = require('../controllers/issuedBook/getIssuedBooks');
const { updateIssuedBooks } = require('../controllers/issuedBook/updateIssuedBooks');
const { updateBookReturned } = require('../controllers/issuedBook/updateBookReturned');

router.route('/').get(getIssuedBooks);
router.route('/issueBook').post(issueBook);
router.route('/updateBooks').patch(updateIssuedBooks);
router.route('/bookReturned').patch(updateBookReturned);

module.exports = router;