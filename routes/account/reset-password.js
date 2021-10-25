const path = require('path');
var crypto = require("crypto");

const ROOT_DIR = process.env.ROOT_DIR;

const { pool } = require(`${ROOT_DIR}/database/db-config`);
const { RESET_PASSWORD_URL } = require(`${ROOT_DIR}/const/api-urls.js`);
const { error_msg_constructor } = require(`${ROOT_DIR}/helper/res-msg-constructor`);

const emailController = require('../../util/email-controller');

function params_validate(params, err) {
    const { email } = params;

    if (!email) {
        err.push('Please eneter all Fields');
    }
    if (email.length < 6) {
        err.push('Email is invalid');
    }
    if (err.length > 0) return false;
    return true;
}

async function filter_by(filter) {
    const { email } = filter;
    try {
        const response = await pool.query(
            `SELECT * FROM "user" WHERE email = $1`,
            [email]
        )
        if (response) {
            return response.rows[0];
        }
        return false;
    } catch (error) {
        throw new Error('user not found')
    }
}
async function update_password(props) {
    const { new_password, email } = props;
    try {
        const response = await pool.query(
            `UPDATE "user" set password = $1 WHERE email = $2`,
            [new_password, email],
        );
        if (response) {
            return true
        }
        return false;
    } catch (error) {
        throw new Error('update password fail')
    }

}

function create_new_password() {
    var new_password = crypto.randomBytes(16).toString('hex');
    return new_password
}
module.exports = function (app, root_path) {
    app.get(RESET_PASSWORD_URL, function (req, res) {
        res.sendFile(path.join(root_path, 'static/reset-password.html'));
    })
        .post(RESET_PASSWORD_URL, async function (req, res) {
            const { email } = req.body;
            let error = [];

            if (!params_validate(req.body, error)) {
                return res.status(400).json({
                    error: error,
                    msg: 'Bad Resquest'
                })
            } else {
                try {
                    const user = await filter_by({ email });
                    console.log(user);
                    if (!user) {
                        res.status(404).json({
                            error: 'Invalid email',
                            msg: 'User not found'
                        })
                    } else {
                        try {
                            var new_password = create_new_password();
                            var isResetSuccess = update_password({ new_password, email });
                            if (isResetSuccess) {
                                emailController.sendMail(req, res, new_password);
                                return res.status(201).json({
                                    data: {},
                                    msg: 'Check your mail',
                                });
                            }
                        } catch (error) {
                            return res.status(500).json({
                                data: {},
                                msg: 'mailing fail',
                            });

                        }
                    }

                } catch (error) {
                    return res.status(500).json({
                        error: error_msg_constructor('Internal Error', err),
                        msg: 'Error while reset password',
                    });
                }
            }
        })
}