const path = require('path');
const { pool } = require('../database/db-config');

module.exports = function (app, root_path) {
    app.get('/login', function (req, res) {
        res.sendFile(path.join(root_path, 'static/login.html'))
    })
        .post('/login', async (req, res) => {
            const { username, password } = req.body;
            if (!username || !password) {
                throw new Error("username or password invalid")
            } else {
                pool.query(
                    `SELECT * FROM "user" WHERE nickname = $1`,
                    [username],
                    (err, results) => {
                        if (err) {
                            res.json({ status: 'error', error: 'Invalid username/password' })

                        }
                        console.log(results.rows);
                        res.json({ status: 'ok', title: 'server was recieved' });
                    })
            }
        })
}