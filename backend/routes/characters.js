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
      res.send(result);
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
      res.status(404).send('Character not found');
    }
  });
});

router.get('/characters/abilities/:characterId', auth.checkAuth, (req, res) => {
  db.pool.query(query.sqlGetCharacterAbilities(req.params.characterId), (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      res.send(result[0]);
    } else {
      res.status(404).send('Character not found')
    }
  });
});

router.get('/characters/armor/:characterId', auth.checkAuth, (req, res) => {
  db.pool.query(query.sqlGetCharacterArmor(req.params.characterId), (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      res.send(result[0]);
    } else {
      res.status(404).send('Character not found')
    }
  });
});

router.get('/characters/gear/:characterId', auth.checkAuth, (req, res) => {
  db.pool.query(query.sqlGetCharacterGear(req.params.characterId), (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      res.send(result);
    } else {
      res.status(404).send('Character not found')
    }
  });
});

router.get('/characters/rites/:characterId', auth.checkAuth, (req, res) => {
  db.pool.query(query.sqlGetCharacterRites(req.params.characterId), (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      res.send(result);
    } else {
      res.status(404).send('Character not found')
    }
  });
});

router.get('/characters/skills/:characterId', auth.checkAuth, (req, res) => {
  db.pool.query(query.sqlGetCharacterSkills(req.params.characterId), (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      res.send(result);
    } else {
      res.status(404).send('Character not found')
    }
  });
});

router.get('/characters/talents/:characterId', auth.checkAuth, (req, res) => {
  db.pool.query(query.sqlGetCharacterTalents(req.params.characterId), (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      res.send(result);
    } else {
      res.status(404).send('Character not found')
    }
  });
});

router.get('/characters/weapons/:characterId', auth.checkAuth, (req, res) => {
  db.pool.query(query.sqlGetCharacterSkills(req.params.characterId), (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      res.send(result);
    } else {
      res.status(404).send('Character not found')
    }
  });
});

module.exports = router;