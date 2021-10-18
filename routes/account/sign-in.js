const path = require('path');
const ROOT_DIR = process.env.ROOT_DIR

const { pool } = require(`${ROOT_DIR}/database/db-config`);
const { SIGN_IN_URL } = require(`${ROOT_DIR}/const/api-urls.js`);
const { error_msg_constructor } = require(`${ROOT_DIR}/helper/res-msg-constructor`)

function params_validate(params, err) {
    const { nickname, password } = params;

    if (!nickname || !password) {
        err.push("Please enter all fields");
    }
    else
    if (password.length < 2) {
        err.push( "Password must be a least 6 characters long");
    }
    if (err.length > 0) return false;
    return true;
}

module.exports = function (app, root_path) {
    app.get(SIGN_IN_URL, function (req, res) {
        res.sendFile(path.join(root_path, 'static/login.html'))
    })
        .post(SIGN_IN_URL, async (req, res) => {
            const { nickname, password } = req.body;
            let errors = [];

            if (! params_validate(req.body, errors)) {
                return res.status(400).json({
                    error: errors,
                    msg: 'Bad Request'
                });
            } else {
                pool.query(
                    `SELECT * FROM "user" WHERE nickname = $1 AND "password" = $2`,
                    [nickname, password],
                    (err, results) => {
                        if (err) {
                            return res.status(501).json({
                                error: error_msg_constructor('Internal Error', err),
                                msg: '',
                            });
                        }

                        if (results.rows.length > 0) {
                            return res.status(200).json({
                                data: results.rows[0],
                                msg: 'Sign-In Succeeded'
                            });
                        } else {
                            res.status(404).json({
                                error: 'Invalid nickname or password',
                                msg: 'Sign-In Failed',
                            });
                        }

                    })
            }
        })

}