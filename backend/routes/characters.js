const express = require('express');
const router = express.Router();

// Middleware
const auth = require('../middleware/auth');

// Utilities
const db = require('../util/database');
const query = require('../util/queries/getCharacterQueries');
const saveQuery = require('../util/queries/postCharacterQueries');

// Route List Characters
router.get('', auth.checkAuth, (req, res) => {
  const id = req.session.userId;
  db.pool.query(query.sqlListCharacters(id), (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      return res.send({ id, uuid: req.session.uuid, result });
    }
    res.send('No charcters found');
  });
});

router.get('/abilities_category', (req, res) => {
  db.pool.query(query.sqlGetAbilitiesCategory(), (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      return res.send({ result });
    }
    res.send('Unable to get Abilities Category table');
  });
});

router.get('/abilities', (req, res) => {
  db.pool.query(query.sqlGetAbilities(), (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      return res.send({ result });
    }
    res.send('Unable to get Abilities table');
  });
});

router.get('/skill_categories', (req, res) => {
  db.pool.query(query.sqlGetSkillsCategory(), (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      return res.send({ result });
    }
    res.send('Unable to get Skill categories table');
  });
});

router.get('/skills', (req, res) => {
  db.pool.query(query.sqlGetSkills(), (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      return res.send({ result });
    }
    res.send('Unable to get Skills table');
  });
});

router.post('/save_info', auth.checkAuth, (req, res) => {
  const id = req.session.userId;
  db.pool.query(saveQuery.sqlSaveCharacterInfo(id, req.body), (err, result) => {
    if (err) throw err;
    if (result.insertId > 0) {
      req.session.characterId = result.insertId;
      return res.send({ id, uuid: req.session.uuid, result });
    }
    res.send('Character not saved');
  });
});

router.post('/save_abilities', auth.checkAuth, (req, res) => {
  const id = req.session.characterId;
  db.pool.query(saveQuery.sqlSaveCharacterAbilities(id, req.body), (err, result) => {
    if (err) {
      console.log('Error' + err);
      return res.send('Error Saving: ' + err);
    }
    if (result.insertId > 0) {
      return res.send({ id, uuid: req.session.uuid, result });
    }
    res.send('Character Abilities not saved');
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