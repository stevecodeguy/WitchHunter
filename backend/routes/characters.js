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

// Route Character Info
router.get('/characters/info/:characterId', auth.checkAuth, (req, res) => {
  db.pool.query(query.sqlGetCharacterInfo(req.userId, req.params.characterId), (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      res.send(result[0]);
    } else {
      res.send('Character not found');
    }
  });
});



module.exports = router;