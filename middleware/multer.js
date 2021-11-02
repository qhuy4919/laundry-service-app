const ROOT_DIR = process.env.ROOT_DIR
const MEDIA_DIR = process.env.MEDIA_DIR

const path = require('path')
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, `${ROOT_DIR}/${MEDIA_DIR}/uploads`);
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        if (req.auth_user) {
            cb(null, 'avatar_' + req.auth_user.id + path.extname(file.originalname));
        } else {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    }
});

const image_filter = require(`${ROOT_DIR}/utils/image-validator`)
var upload = multer({ storage: storage, fileFilter: image_filter })

module.exports = upload;
