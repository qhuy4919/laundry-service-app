const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require("dotenv").config();

// Setting up Project Root Dir
process.env.ROOT_DIR = __dirname

// Get routes from index
const {sign_in_route, sign_up_route, sign_out_route} = require('./routes/account/index')

// Middleware
const app = express();
app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'static')))

sign_in_route(app, __dirname);
sign_up_route(app, __dirname);

// Start the Server
app.listen(process.env.SERVER_PORT, () => { 
	console.log('Server running on port ' + `${process.env.SERVER_PORT}` + '...') 
})