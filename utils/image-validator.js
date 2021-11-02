const imageFilter = function(req, file, cb) {
    // Accept images only
    const fileSize = parseInt(req.headers['content-length']);

    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(null, false);
    }
    if(fileSize > 10*1024*1024) {
        req.fileValidationError = 'File size is too large!'
        return cb(null, false);
    }

    return cb(null, true);
};

module.exports = imageFilter;