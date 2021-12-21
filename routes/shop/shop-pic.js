const ROOT_DIR = process.env.ROOT_DIR
const MEDIA_DIR = process.env.MEDIA_DIR

const multer = require('multer')
const path = require('path');

// DAO
const {sequelize} = require(`${ROOT_DIR}/database/sequelize_object`)
var Models = require(`${ROOT_DIR}/models/init-models`)(sequelize);

const { DEFAULT_SHOP_PIC, ROLE_ADMIN, ROLE_USER } = require(`${ROOT_DIR}/const/values.js`);
const { SHOP_PIC_URL } = require(`${ROOT_DIR}/const/api-urls.js`);

const auth_token = require(`${ROOT_DIR}/middleware/token-verify`)
const upload = require(`${ROOT_DIR}/middleware/multer`)

module.exports = function (app, root_path) {
    // ---------------- GET method
    app.get('/shop-pic-form', (req, res) => {
        return res.sendFile(`${ROOT_DIR}/static/put-shop-form.html`);
    })
    .post(SHOP_PIC_URL+'/:id', auth_token, perm_check_middleware, upload.single('shop_pic'), async (req, res) => {
		// console.log(req.file);
		const shop = req.shop;
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

		await shop.update({ shop_profile_pic: req.file.filename, })
		return res.status(204).json({ msg: "OK", })
    })
	.get('/shop-pic/:filename', (req, res) => {
		const filename = req.params.filename;
		if (filename) {
			try {
				const filepath = `${ROOT_DIR}/${MEDIA_DIR}/uploads/${filename}`;
				console.log(filepath)
				if (require('fs').existsSync(filepath))
					return res.sendFile(filepath)
				else
					if (require('fs').existsSync(`${ROOT_DIR}/${MEDIA_DIR}/uploads/${DEFAULT_SHOP_PIC}`))
						return res.sendFile(`${ROOT_DIR}/${MEDIA_DIR}/uploads/${DEFAULT_SHOP_PIC}`)
			} catch (err) {
			}
		}
		return res.status(404).send("NOT FOUND")
    })
};

const perm_check_middleware = async (req, res, next) => {
	try {
		var user = req.auth_user;
		var shop_id = req.params.id;

		if (!shop_id) { // null or undefined or empty list
			return res.status(400).json({
				error: "No Shop ID provided", msg: "No Shop ID attached to request.",
			})
		}
		if (isNaN(parseInt(shop_id))) {
			return res.status(400).json({
				error: "Invalid Shop ID", msg: "Shop ID cannot be non-integer",
			})
		}
		// parse
		shop_id = parseInt(shop_id)

		const shop = await Models.laundry_shop.findOne({ where : { id : shop_id } });
		if (!shop) {
			return res.status(404).json({
				error: "Could not find Shop", msg: `No shop with the id=${shop_id}.`,
			})
		}

		// check permission
		if (user.role !== ROLE_ADMIN && user.id !== shop.user_id) { // not admin and not the owner
			return res.status(401).json({
				error: "Insufficient permission", msg: "You cannot edit this shop information",
			})
		}
		req.upload_shop_pic = true;
		req.shop = shop;
		return next(); // forward
	} catch (err) {
		console.log(err)
		return res.status(500).json({
			error: err,
			msg: "Internal Error while doing Perm Check",
		});
	}
};
