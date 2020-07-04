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
router.post('/user/login', async (req, res) => {
  const username = sanitize(req.body.username);

  db.pool.query(query.sqlCheckPassword(username), async (error, result) => {
    if (error) {
      throw new Error('DB Connection Error');
    }

    if (result.length === 0) {
      return res.status(401).json({ success: false });
    }

    const matchedPassword = await bcrypt.compare(sanitize(req.body.password), result[0].password);

    if (!matchedPassword) {
      throw new Error('Login failed');
    }
    // res.send(result[0])
    return result[0];
  });
});

// Route - Create new user
router.post('/user/new', async (req, res) => {
  const username = sanitize(req.body.username);
  const email = sanitize(req.body.email);

  try {
    bcrypt.genSalt(12, (error, salt) => {
      if (error) throw error;
      bcrypt.hash(sanitize(req.body.password), salt, (error, hash) => {
        if (error) throw error;

        db.pool.query(query.sqlCreateUser(username, hash, email), async (error, createResult) => {

          if (error) { 
            if (error.errno === 1062) {
              return console.log('Duplicate user entry: ', username);
            } else {
              return res.status(500).json({message: 'Account creation failure.', success: false});
            }
          } 

          const token = await auth.createToken(createResult.insertId);
          res.status(200).json({
            message: 'User created', 
            success: true,
            token
          });
        });
      });
    });
  } catch(error) {
    res.status(500).send();
  }
});

module.exports = router;