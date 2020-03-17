const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routeLogin = require('./routes/loginRoute');
const routeCreateUser = require('./routes/createUserRoute');

const app = express();
const port = 3000; 

app.use(cors());
app.use(bodyParser.json());

app.use('/createuser', routeCreateUser);
app.use('/checkcredentials', routeLogin);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})

module.exports = app;