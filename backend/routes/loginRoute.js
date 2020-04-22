const express = require('express');
const router = express.Router();

const users = require('../util/users');

router.post('/', users.login);

module.exports = router;