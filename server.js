const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require("dotenv").config();

// Setting up Project Root Dir
process.env.ROOT_DIR = __dirname

const app = express();
// Middleware
// -- cors headers
var cors = require('cors')
app.use(cors())

app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'public')))
app.use(express.static(__dirname + '/static'));

// -- multer form-data
// Get routes from index
// -- ACCOUNT routes
const { sign_in_route , sign_up_route, reset_password, /*token_test*/ } = require('./routes/account/index')
sign_in_route(app, __dirname);
sign_up_route(app, __dirname);

reset_password(app, __dirname);
// token_test(app, __dirname);

// -- MAIL routes
const { mail_confirm } = require('./routes/mail/index')
mail_confirm(app, __dirname);

// -- PROFILE routes
const {profile_route, profile_pic_route} = require('./routes/profile/index')
profile_route(app, __dirname);
profile_pic_route(app, __dirname);

// -- SHOP routes
const {shop_route, shop_pic_route} = require('./routes/shop/index')
shop_route(app, __dirname);
shop_pic_route(app, __dirname);

// -- miscellaneous routes (other routes)
const {images_route} = require('./routes/misc/index')
images_route(app, __dirname);

// Start the Server
app.listen(process.env.SERVER_PORT, () => {
	console.log('Server running on port ' + `${process.env.SERVER_PORT}` + '...')
})