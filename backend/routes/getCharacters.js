const express = require('express');
const router = express.Router();

const users = require('../util/users');
const db = require('../util/database');

async function getCharacterList(userId){
  return new Promise((resolve, reject) => {
    let sql = `SELECT id, name FROM character_info WHERE fk_user = ${userId}`;
    db.pool.query(sql, (err, qryRes) => {
      if (err) reject('No characters found');
      resolve(qryRes);
    })
  });
}

router.post('/:userId/', (req, res) => {
  console.log(req.params.userId)
  res.send('In Characters');
})

module.exports = router;