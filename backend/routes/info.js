const express = require('express');
const router = express.Router();

// Middleware
const auth = require('../middleware/auth');

// Utilities
const db = require('../util/database');
const query = require('../util/queries/controlQueries');

// Route Info Controls
router.get('/religion', (req, res) => {
  db.pool.query(query.sqlGetInfoReligions(), (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.get('/order', (req, res) => {
  db.pool.query(query.sqlGetInfoOrders(), (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.get('/order_benefits', (req, res) => {
  db.pool.query(query.sqlGetInfoOrderBenefits(), (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.get('/sin_vice', (req, res) => {
  db.pool.query(query.sqlGetInfoSinsVices(), (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.get('/virtue', (req, res) => {
  db.pool.query(query.sqlGetInfoVirtues(), (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.get('/background', (req, res) => {
  db.pool.query(query.sqlGetInfoBackgrounds(), (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.get('/sex', (req, res) => {
  db.pool.query(query.sqlGetInfoSex(), (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

module.exports = router;