const ROOT_DIR = process.env.ROOT_DIR
const MEDIA_DIR = process.env.MEDIA_DIR

const multer = require('multer')
const path = require('path');

const { DEFAULT_PROFILE_PIC } = require(`${ROOT_DIR}/const/values.js`);
const { PROFILE_PIC_URL } = require(`${ROOT_DIR}/const/api-urls.js`);

const auth_token = require(`${ROOT_DIR}/middleware/token-verify`)
const upload = require(`${ROOT_DIR}/middleware/multer`)

module.exports = function (app, root_path) {
    // ---------------- GET method
	app.get('/images/:filename', (req, res) => {
		const filename = req.params.filename;
		if (filename) {
			try {
				const filepath = `${ROOT_DIR}/static/img/${filename}`;
				if (require('fs').existsSync(filepath))
					return res.sendFile(filepath)
				else
					if (require('fs').existsSync(`${ROOT_DIR}/static/img/bad.gif`))
						return res.sendFile(`${ROOT_DIR}/static/img/bad.gif`)
					return res.send("Missing default image")
			} catch (err) {
			}
		}
		return res.send("NOT FOUND")
    })
};