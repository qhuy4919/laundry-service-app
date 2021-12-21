const ROOT_DIR = process.env.ROOT_DIR
const { TOKEN_EXPIRES_AFTER_SECONDS } = require(`${ROOT_DIR}/const/values`)

const {sequelize} = require(`${ROOT_DIR}/database/sequelize_object`)
var Models = require(`${ROOT_DIR}/models/init-models`)(sequelize);

const { ROLE_ADMIN, ROLE_USER } = require(`${ROOT_DIR}/const/values.js`);

const userAdmin = async (req, res, next) => {
	const user = req.auth_user;
	// console.log(user)

	if (!user) {
		return res.status(403).json({
			error: "Invalid User",
			msg: "Cannot authenticate request source"
		});
	}

	try {
		if (user.role && user.role.toLowerCase() === ROLE_ADMIN ) return next(); // forward
		else return res.status(401).json({
				error: "Insufficient Permission",
				msg: "This operation was not allowed",
			});
	} catch (err) {
		return res.status(500).json({
			error: err,
			msg: "Internal Error while Checking Role",
		});
	}
};

module.exports = userAdmin;