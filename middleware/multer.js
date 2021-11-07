const ROOT_DIR = process.env.ROOT_DIR
const MEDIA_DIR = process.env.MEDIA_DIR

const { PROFILE_PREFIX, SHOP_PREFIX } = require(`${ROOT_DIR}/const/values.js`);

const path = require('path')
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, `${ROOT_DIR}/${MEDIA_DIR}/uploads`);
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        if (req.auth_user && req.upload_profile_pic) {
            cb(null, PROFILE_PREFIX + req.auth_user.id + path.extname(file.originalname));
        } else 
        if (req.upload_shop_pic) {
            cb(null, SHOP_PREFIX + req.shop.id + path.extname(file.originalname));
        } else {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    }
});

const image_filter = require(`${ROOT_DIR}/utils/image-validator`)
var upload = multer({ storage: storage, fileFilter: image_filter })

module.exports = upload;
