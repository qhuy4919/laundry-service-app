const ROOT_DIR = process.env.ROOT_DIR

const { TOKEN_EXPIRES_AFTER_SECONDS } = require(`${ROOT_DIR}/const/values`)

function tokenValidate(token, userObj) {
	if ( !(token && userObj && userObj.token) ) return false;
	if ( token !== userObj.token ) return false;

	var time_delta = Math.ceil((new Date()) - (userObj.token_created_at));
	if (time_delta > TOKEN_EXPIRES_AFTER_SECONDS * 1000) return false;
	return true;
}

function tokenGenerate(leng=64) {
    var token = require('crypto').randomBytes(leng).toString('hex');
    return token
}

module.exports = {
	tokenValidate,
	tokenGenerate,
}

