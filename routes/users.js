const express = require('express');
const router = express.Router();
const { getUsers } = require('../controllers/user/getUsers');
const { getSingleUser } = require('../controllers/user/getSingleUser');

router.route('/').get(getUsers);
router.route('/:id').get(getSingleUser);

module.exports = router;