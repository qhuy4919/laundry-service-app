const path = require('path')

module.exports = function (app, root_path) {
    app.get('/logout', function (req, res) {
        res.sendFile(path.join(root_path, 'static/index.html'));
    })
}