const BCRYPTJS_SALT = 8;
const TOKEN_EXPIRES_AFTER_SECONDS = 3600*4;
const ACTIVATION_TOKEN_LENGTH = 32;
const AUTH_TOKEN_LENGTH = 64;

module.exports = {
	BCRYPTJS_SALT,
	TOKEN_EXPIRES_AFTER_SECONDS,
	ACTIVATION_TOKEN_LENGTH,
}