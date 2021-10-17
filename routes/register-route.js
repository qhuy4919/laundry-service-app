const path = require('path');
const { pool } = require('../database/db-config');

module.exports = function (app, root_path) {

    app.get('/sign-up', function (req, res) {
        res.sendFile(path.join(root_path, 'static/register.html'))
    })
        .post('/sign-up', async (req, res) => {
            const { username, email, password, confirm_password } = req.body;
            if (!username || !email || !password) {
                throw new Error("username or email or password invalid")
            }
            if (password != confirm_password) {
                throw new Error("confirmation password invalid ")
            }
            else {
                pool.query(`INSERT INTO "user" (nickname, email, "password", "role")
                VALUES	('${username}', '${email}', '${password}', 'User')`),
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