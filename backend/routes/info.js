const express = require('express');
const router = express.Router();

// Utilities
const db = require('../util/database');
const query = require('../util/queries');

// Route Info Controls
router.get('/info/religion', (req, res) => {
  db.pool.query(query.sqlGetInfoReligions(), (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.get('/info/order', (req, res) => {
  db.pool.query(query.sqlGetInfoOrders(), (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.get('/info/sinsvices', (req, res) => {
  db.pool.query(query.sqlGetInfoSinsVices(), (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.get('/info/virtues', (req, res) => {
  db.pool.query(query.sqlGetInfoVirtues(), (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

module.exports = router;