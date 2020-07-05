if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const https = require('https');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

//Utilities
const db = require('./util/database');
const PORT = 3000;

//Routes
const routeUser = require('./routes/user');
const routeCharacters = require('./routes/characters');

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origins', '*');
  res.append('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
  res.append('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  next();
});

//Routes
app.use(routeUser);
app.use(routeCharacters);

app.get('*', (req, res) => {
  res.status(404).send();
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
}); 

module.exports = app;