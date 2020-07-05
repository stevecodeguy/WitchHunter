const express = require('express');
const router = express.Router();

// Middleware
const auth = require('../middleware/auth');

// Utilities
const db = require('../util/database');
const query = require('../util/queries');

// Route List Characters
router.get('/characters', auth.checkAuth, (req, res) => {
  db.pool.query(query.sqlListCharacters(req.userId), (err, result) => {
    if (err) throw err;
    
    if (result.length > 0) {
      res.send(result[0]);
    } else {
      res.send('No charcters found');
    }
  });
});

module.exports = router;