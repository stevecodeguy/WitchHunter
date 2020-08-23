const express = require('express');
const router = express.Router();

// Middleware
const auth = require('../middleware/auth');

// Utilities
const db = require('../util/database');
const query = require('../util/queries');

// Route List Characters
router.get('', auth.checkAuth, (req, res) => {
// router.get('', (req, res) => {
  const id = req.session.userId;
  db.pool.query(query.sqlListCharacters(id), (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      return res.send({id, uuid: req.session.uuid, result});
    }
    res.send('No charcters found');
  });
});

// Route Character Info
router.get('/info/:characterId', (req, res) => {
  db.pool.query(query.sqlGetCharacterInfo(req.userId, req.params.characterId), (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      return res.send(result[0]);
    }
    res.status(404).send('Character not found');
  });
});

router.get('/abilities/:characterId', (req, res) => {
  db.pool.query(query.sqlGetCharacterAbilities(req.params.characterId), (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      return res.send(result[0]);
    }
    res.status(404).send('Character not found');
  });
});

router.get('/ability/costs', (req, res) => {
  db.pool.query(query.sqlGetInfoAbilityCosts(), (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      return res.send(result);
    }
    res.status(404).send('Table not found');
  });
});

router.get('/armor/:characterId', (req, res) => {
  db.pool.query(query.sqlGetCharacterArmor(req.params.characterId), (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      return res.send(result[0]);
    }
    res.status(404).send('Character not found');
  });
});

router.get('/gear/:characterId', (req, res) => {
  db.pool.query(query.sqlGetCharacterGear(req.params.characterId), (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      return res.send(result);
    }
    res.status(404).send('Character not found');
  });
});

router.get('/rites/:characterId', (req, res) => {
  db.pool.query(query.sqlGetCharacterRites(req.params.characterId), (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      return res.send(result);
    } 
    res.status(404).send('Character not found');
  });
});

router.get('/skills/:characterId', (req, res) => {
  db.pool.query(query.sqlGetCharacterSkills(req.params.characterId), (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      return res.send(result);
    } 
    res.status(404).send('Character not found');
  });
});

router.get('/talents/:characterId', (req, res) => {
  db.pool.query(query.sqlGetCharacterTalents(req.params.characterId), (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      return res.send(result);
    }
    res.status(404).send('Character not found');
  });
});

router.get('/weapons/:characterId', (req, res) => {
  db.pool.query(query.sqlGetCharacterSkills(req.params.characterId), (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      return res.send(result);
    }
    res.status(404).send('Character not found');
  });
});

module.exports = router;