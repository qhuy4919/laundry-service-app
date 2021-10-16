const path = require('path');

module.exports = function (app, root_path) {
    app.get('/login', function (req, res) {
        res.sendFile(path.join(root_path, 'static/login.html'))
    })
        .post('/login', async (req, res) => {
            const { username, password } = req.body;
            console.log(username, password);
            // const user = await User.findOne({ username }).lean()

            // if (!user) {
            //     return res.json({ status: 'error', error: 'Invalid username/password' })
            // }

            // if (await bcrypt.compare(password, user.password)) {
            //     // the username, password combination is successful

            //     const token = jwt.sign(
            //         {
            //             id: user._id,
            //             username: user.username
            //         },
            //         JWT_SECRET
            //     )

            //     return res.json({ status: 'ok', data: token })
            // }
            res.json({ status: 'ok', error: 'Invalid username/password' })
        })
}