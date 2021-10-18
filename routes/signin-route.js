const path = require('path');
const { pool } = require('../database/db-config');

module.exports = function (app, root_path) {
    app.get('/signin', function (req, res) {
        res.sendFile(path.join(root_path, 'static/login.html'))
    })
        .post('/signin', async (req, res) => {
            const { username, password } = req.body;
            let errors = [];
            if (!username || !password) {
                errors.push({ message: "Please enter all fields" });
            }

            if (password.length < 2) {
                errors.push({ message: "Password must be a least 6 characters long" });
            }
            if (errors.length > 0) {
                return res.json({
                    data: {},
                    msg: {
                        status: '400', message: JSON.stringify(errors)
                    }
                });
            } else {
                pool.query(
                    `SELECT * FROM "user" WHERE nickname = $1`,
                    [username],
                    (err, results) => {
                        if (err) {
                            return res.json({
                                data: {},
                                msg: {
                                    status: '501', message: 'hiu'
                                }
                            });

                        }
                        console.log(results.rows);
                        if (results.rows.length > 0) {
                            const user = results.rows[0];
                            if (user.password === password)
                                return res.json({
                                    data: {},
                                    msg: {
                                        status: '200', message: 'signin successful'
                                    }
                                });
                        }
                        res.json({
                            data: {},
                            msg: {
                                status: '401', message: 'Invalid username/password'
                            }
                        });

                    })
            }
        })


}