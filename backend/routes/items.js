const express = require('express');
const router = express.Router();

// Middleware
const auth = require('../middleware/auth');

// Utilities
const db = require('../util/database');
const query = require('../util/queries/controlQueries');

// Route Item Controls
router.get('/money', (req, res) => {
  db.pool.query(query.sqlGetItemsMoney(), (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.get('/armor', (req, res) => {
  db.pool.query(query.sqlGetItemsArmor(), (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.get('/gear', (req, res) => {
  db.pool.query(query.sqlGetItemsGear(), (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.get('/kits', (req, res) => {
  db.pool.query(query.sqlGetItemsKits(), (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.get('/kits', (req, res) => {
  db.pool.query(query.sqlGetItemsKits(), (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.get('/kit_items', (req, res) => {
  db.pool.query(query.sqlGetItemsKitItems(), (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.get('/shots', (req, res) => {
  db.pool.query(query.sqlGetItemsShots(), (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.get('/vehicles', (req, res) => {
  db.pool.query(query.sqlGetItemsVehicles(), (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.get('/weapons', (req, res) => {
  db.pool.query(query.sqlGetItemsWeapons(), (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

module.exports = router;