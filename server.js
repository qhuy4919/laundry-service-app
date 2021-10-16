const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const login_route = require('./routes/login-route');

const app = express();

app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'static')))

//
login_route(app, __dirname);

app.listen(5000, () => { console.log('server running on 5000 port') })