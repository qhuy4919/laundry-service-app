const ROOT_DIR = process.env.ROOT_DIR
const { pool } = require(`${ROOT_DIR}/database/db-config`);
const { TOKEN_EXPIRES_AFTER_SECONDS } = require(`${ROOT_DIR}/const/values`)

const verifyToken = async (req, res, next) => {
	const token =
		req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"]

	if (!token) {
		return res.status(403).json({
			error: "Missing token",
			msg: "A token is required for authentication"
		});
	}

	try {
		const results = await pool.query(`SELECT "nickname", "token_created_at", \
							"is_persistent" FROM "user" WHERE "token" = $1`, [token])
		if (results.rows.length <= 0) {
			return res.status(400).json({
				error: "Invalid Token",
				msg: "Invalid Token"
			})
		}
		const row = results.rows[0];

		// -- BUG: Difference in Timezone makes expiration checking not possible
		// -- TODO: Change DB server timezone to GMT+7 Asia/Ho_Chi_Minh
		// console.log(row.token_created_at)
		// const timedelta = Math.abs(Math.ceil( (new Date()) - row.token_created_at));
		// console.log(timedelta);
		// if ( timedelta > TOKEN_EXPIRES_AFTER_SECONDS*1000) {
		// 	return res.status(401).json({
		// 		error: "Token Expired",
		// 		msg: "Invalid Token"
		// 	})
		// }

		return next(); // forward
	} catch (err) {
		return res.status(500).json({
			error: err,
			msg: "Internal Error while Verifying Token",
		});
	}
};

module.exports = verifyToken;