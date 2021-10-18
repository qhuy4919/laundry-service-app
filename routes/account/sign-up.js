const path = require('path');
const ROOT_DIR = process.env.ROOT_DIR

const { pool } = require(`${ROOT_DIR}/database/db-config`);
const { SIGN_UP_URL } = require(`${ROOT_DIR}/const/api-urls.js`);
const { error_msg_constructor } = require(`${ROOT_DIR}/helper/res-msg-constructor`)

function params_validate(params, err) {
    const { username, email, password, confirm_password } = params;
    
    if (!username || !email || !password) {
        err.push("Username or Email or Password is invalid")
    }
    if (password != confirm_password) {
        err.push("Confirmation password and Password mismatched")
    }
    if (err.length > 0) return false;
    return true;
}

module.exports = function (app, root_path) {

    app.get(SIGN_UP_URL, function (req, res) {
        res.sendFile(path.join(root_path, 'static/register.html'))
    })
        .post(SIGN_UP_URL, async (req, res) => {
            const { username, email, password, confirm_password } = req.body;
            let err = []

            if (! params_validate(req.body, err)) {
                return res.status(400).json({
                    error: err,
                    msg: 'Bad Request'
                });
            } else {
                    pool.query(
                        `INSERT INTO "user" (nickname, email, "password", "role")
                        VALUES	('${username}', '${email}', '${password}', 'User')`
                    ).then((result) => {
                        return res.status(201).json({
                            data: {},
                            msg: 'User Created',
                        });
                    }).catch((err) => {
                        return res.status(500).json({
                            error: error_msg_constructor('Internal Error', err),
                            msg: 'Error while Inserting',
                        });
                    })
            }
        })
}