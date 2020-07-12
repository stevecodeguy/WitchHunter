const express = require('express');
const router = express.Router();

// Middleware
const auth = require('../middleware/auth');

// Utilities
const db = require('../util/database');
const query = require('../util/queries');

// Route Info Controls
router.get('/info/religion', auth.checkAuth, (req, res) => {
  db.pool.query(query.sqlGetInfoReligions(), (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.get('/info/order', auth.checkAuth, (req, res) => {
  db.pool.query(query.sqlGetInfoOrders(), (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.get('/info/sinVice', auth.checkAuth, (req, res) => {
  db.pool.query(query.sqlGetInfoSinsVices(), (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.get('/info/virtue', auth.checkAuth, (req, res) => {
  db.pool.query(query.sqlGetInfoVirtues(), (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.get('/info/background', auth.checkAuth, (req, res) => {
  db.pool.query(query.sqlGetInfoBackgrounds(), (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

module.exports = router;