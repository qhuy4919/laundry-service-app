const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require("dotenv").config();

// import Models Layer
const {sequelize} = require('./database/sequelize_object')
var Models = require("./models/init-models")(sequelize);

(async () => {
	try {

		// await sequelize.authenticate();
		// Find all users
		const users = await Models.user.findAll();
		console.log(users.every(user => user instanceof Models.user)); // true
		console.log("All users:", JSON.stringify(users, null, 2));

		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
})();