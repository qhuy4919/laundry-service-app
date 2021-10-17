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
                pool.query(`SELECT * FROM "user" WHERE nickname = '${username}'`),
                    (err, result) => {
                        if (err) {
                            throw new Error("query user fail");
                        }
                        else {
                            console.log(result.rows);
                            res.json({ status: 'ok', error: "let's go" })
                        }
                    }

            }
            res.json({ status: 'ok', error: "let's go" })
            // res.json({ status: 'error', error: 'Invalid username/password' })
        })
}