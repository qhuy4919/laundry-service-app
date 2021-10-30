const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require("dotenv").config();

// Enable cross origin request
var cors = require('cors')

// Setting up Project Root Dir
process.env.ROOT_DIR = __dirname

// Middleware
const app = express();
app.use(cors())
app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'static')))

// Get routes from index
// ACCOUNT routes
const { sign_in_route , sign_up_route, /*reset_password, token_test*/ } = require('./routes/account/index')
sign_in_route(app, __dirname);
sign_up_route(app, __dirname);
// reset_password(app, __dirname);
// token_test(app, __dirname);

// MAIL routes
const { mail_confirm } = require('./routes/mail/index')
mail_confirm(app, __dirname);

// Start the Server
app.listen(process.env.SERVER_PORT, () => {
	console.log('Server running on port ' + `${process.env.SERVER_PORT}` + '...')
})