const LocalStrategy = require("passport-local").Strategy;
const { pool } = require("./db-config");
const bcrypt = require("bcrypt");



