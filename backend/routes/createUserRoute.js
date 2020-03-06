const express = require('express');

const createUserController = require('../controllers/createUserController');

const router = express.Router();

router.post('/', createUserController.createUser);

module.exports = router;