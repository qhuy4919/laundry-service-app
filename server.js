const express = require('express');
const path = require('path');
// const mongoose = require('mongoose');
// const routes = require('./routes');

const app = express();
app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'static')))

//
//login
app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname, 'static/login.html'))
})
app.post('/login', async (req, res) => {
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


app.listen(5000, () => { console.log('server running on 5000 port') })