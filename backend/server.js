const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const db = require('./util/database');
const PORT = 3000;

//Routes
const routeLogin = require('./routes/loginRoute');
const routeCreateUser = require('./routes/createUserRoute');

//Database Session
const mySQLStore = require('express-mysql-session')(session);
const sessionStore = new mySQLStore(db.options, db.pool);

const sessionOptions = {
    key: 'userkey',
    secret: 'Suff3r n0t the w!tch $hall l!ve',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    expiration: 60000,
    // secure: true  // -Turn on when ready for HTTPS
}

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use( session( sessionOptions ) );

//Routes
app.get('/auth/:user', (req, res) => {
    req.session.user = req.params.user;
    req.session.cookie.expires = false;
    req.session.cookie.maxAge = 20 * 60 * 1000;
    res.send('session found ' + req.session.cookie.expires)
    res.end('welcome to the session demo. refresh!')
})

app.use('/createuser', routeCreateUser);
app.use('/checkcredentials', routeLogin);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})

module.exports = app;