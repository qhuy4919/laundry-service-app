const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const login_route = require('./routes/login-route');
require("dotenv").config();

// Middleware
const app = express();
app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'static')))

//
login_route(app, __dirname);

app.listen(4000, () => { console.log('server running on 4000 port') })