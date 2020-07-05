const express = require('express');
const router = express.Router();

// Middleware
const auth = require('../middleware/auth');

router.get('/characters', (req, res) => {
  res.send('characters');
});

module.exports = router;