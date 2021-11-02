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
    app.get('/profile-pic-form', (req, res) => {
        return res.sendFile(`${ROOT_DIR}/static/file-upload.html`);
    })
    .post(PROFILE_PIC_URL, auth_token, upload.single('profile_pic'), async (req, res) => {
		console.log(req.file);
		if (req.fileValidationError) {
			return res.status(400).json({
				error: "Invalid File",
				msg: req.fileValidationError,
			})
        }
        else if (!req.file) {
			return res.status(400).json({
				error: "No file",
				msg: "Please select an image file",
			})
        }

		var user = req.auth_user;
		await user.update({
			profile_pic: req.file.filename, 
		})
		return res.status(204).json({
			msg: "OK",
		})
    })
	.get('/profile-pic/:filename', (req, res) => {
		const filename = req.params.filename;
		if (filename) {
			try {
				const filepath = `${ROOT_DIR}/${MEDIA_DIR}/uploads/${filename}`;
				console.log(filepath)
				if (require('fs').existsSync(filepath))
					return res.sendFile(filepath)
				else
					return res.sendFile(`${ROOT_DIR}/${MEDIA_DIR}/uploads/${DEFAULT_PROFILE_PIC}`)
			} catch (err) {
			}
		}
		return res.send("NOT FOUND")
    })
};