const path = require('path');
require("dotenv").config();

DEBUG_MODE = `${process.env.DEBUG_MODE}`

function error_msg_constructor(errName, errDesc) {
	if (DEBUG_MODE) {
		return {
			error: errName,
			description: errDesc
		}
	}
	return {error: errName}
}

module.exports = {
	error_msg_constructor,
}