module.exports = function (app) {
    app.get('/logout', function (req, res) {
        //res.sendFile(path.join(root_path, 'static/index.html'));
        return res.status(204).json({
            msg: 'Signing Out..',
        });
    })
}