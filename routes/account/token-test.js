const ROOT_DIR = process.env.ROOT_DIR
const { TOKEN_TEST_URL } = require(`${ROOT_DIR}/const/api-urls`);

const token_auth = require(`${ROOT_DIR}/middleware/token-verify`);

// TODO: Use async await rather than nesting pool.query like this...
module.exports = function (app, root_path) {
    app.post(TOKEN_TEST_URL, token_auth, (req, res) => {
		return res.status(200).json({data: "", msg: "Token All Good!🙌"});
    })
}