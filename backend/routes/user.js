const express = require('express');
const router = express.Router();

// Packages
const bcrypt = require('bcrypt');

// Middleware
const auth = require('../middleware/auth');

// Utilities
const db = require('../util/database');
const sanitize = require('../util/sanitize');
const query = require('../util/queries');

// Route - User login
router.post('/login', (req, res) => {
  try {
    const username = sanitize(req.body.username);
    db.pool.query(query.sqlCheckPassword(username), async (err, result) => {
      if (err) throw err;

      if (result.length === 0) {
        return res.status(401).send({ login: false });
      }

      const matchedPassword = await bcrypt.compare(sanitize(req.body.password), result[0].password);

      if (!matchedPassword) {
        return res.status(401).send('Login failed');
      }

      let authToken;
      
      if (req.header('Authorization')){
        authToken = req.header('Authorization').substring(7);
      } else {
        authToken = await auth.createJwt(result[0].id);
      }
      req.session.userId = result[0].id;
      req.session.uuid = result[0].uuid;
      req.session.userName = result[0].username;
      req.session.authToken = authToken;
      res.send({ uuid: result[0].uuid, username: result[0].username, authToken });
    });
  } catch (err) {
    res.send(err);
  }
  
});

// Route - Logout user
router.post('/logout', (req, res) => {
  try {
    db.pool.query(query.sqlDeleteToken(req.tokenId), (err, result) => {
      if (err) throw err;
    });
    res.send();
  } catch (err) {
    res.status(500).send();
  }
});

// Route - Logout all user connections
router.post('/logoutAll', (req, res) => {
  try {
    db.pool.query(query.sqlDeleteAllTokens(req.userId), (err, result) => {
      if (err) throw err;
    });
    res.send();
  } catch (err) {
    res.status(500).send();
  }
});

// Route - Create new user
router.post('/new', async (req, res) => {
  const username = sanitize(req.body.username);
  const email = sanitize(req.body.email);

  try {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(sanitize(req.body.password), salt, (err, hash) => {
        if (err) throw err;

        db.pool.query(query.sqlCreateUser(username, hash, email), async (err, createResult) => {

          if (err) {
            if (err.errno === 1062) {
              return res.status(400).send('Duplicate user entry: ' + username);
            } else {
              return res.status(500).json({ message: 'Account creation failure.', success: false });
            }
          }

          // const token = await auth.setAuthToken(createResult.insertId);

          res.status(200).send({
            message: 'User created',
            success: true,
            // token
          });
        });
      });
    });
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;