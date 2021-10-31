const path = require('path');
const ROOT_DIR = process.env.ROOT_DIR

const { pool } = require(`${ROOT_DIR}/database/db-config`);
const { SIGN_UP_URL } = require(`${ROOT_DIR}/const/api-urls.js`);
const { BCRYPT_SALT } = require(`${ROOT_DIR}/const/values.js`)
const { error_msg_constructor } = require(`${ROOT_DIR}/helper/res-msg-constructor`)
const { tokenGenerate } = require(`${ROOT_DIR}/helper/token`)

const emailController = require(`${ROOT_DIR}/util/email-controller`);
const bcrypt = require('bcryptjs');

function params_validate(params, err) {
    const { nickname, email, password, confirm_password } = params;

    if (!nickname || !email || !password) {
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
            const { nickname, email, password, confirm_password } = req.body;
            let err = []

            if (! params_validate({nickname, email, password, confirm_password}, err)) {
                return res.status(400).json({
                    error: err,
                    msg: 'Bad Request'
                });
            } 
            // OK - password maches
            // Hash password
            const passwd_hash = bcrypt.hashSync(password, BCRYPT_SALT);
            const genToken = tokenGenerate(8);

            pool.query(
                `INSERT INTO "user" (nickname, email, "password", "token", "role", "active")
                    VALUES	($1, $2, $3, $4, 'User', FALSE)`,
                [nickname, email, passwd_hash, genToken]
            ).then((result) => {
                emailController.sendMail(req, res, 
                    {   subject: SIGN_UP_URL, 
                        content: `Registration for user "${nickname}" is Successful. ` +
                                `Your Email Confimation Code is "${genToken}"`
                    }
                )

                return res.status(201).json({
                    data: {},
                    msg: 'Confirmation Email Sent',
                });

            }).catch((err) => {
                return res.status(500).json({
                    error: error_msg_constructor('Internal Error', err),
                    msg: 'Error while Registering - Maybe this Nickname or Email has already been used?',
                });
            })
        })
}