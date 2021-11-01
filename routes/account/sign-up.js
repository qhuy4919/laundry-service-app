const path = require('path');
const ROOT_DIR = process.env.ROOT_DIR

// DAO
const {sequelize} = require(`${ROOT_DIR}/database/sequelize_object`)
var Models = require(`${ROOT_DIR}/models/init-models`)(sequelize);

const { SIGN_UP_URL, MAIL_CONFIRM_URL } = require(`${ROOT_DIR}/const/api-urls.js`);
const { BCRYPT_SALT, ACTIVATION_TOKEN_LENGTH } = require(`${ROOT_DIR}/const/values.js`)
const { error_msg_constructor } = require(`${ROOT_DIR}/utils/res-msg-constructor`)
const { tokenGenerate } = require(`${ROOT_DIR}/utils/token`)

const mailer = require(`${ROOT_DIR}/utils/mailer`);
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
            const genToken = tokenGenerate(ACTIVATION_TOKEN_LENGTH);

            Models.user.create({
                nickname, email, password: passwd_hash, token: genToken,
                role: "User", active: false
            }).then((result) => {
                const account_activate_url = `${process.env.SERVER_PROTOCOL}://${process.env.DB_HOST}:${process.env.SERVER_PORT}${MAIL_CONFIRM_URL}?token=${genToken}`;

                mailer.sendMail(req, res, 
                    {   subject: SIGN_UP_URL, 
                        content: `Registration is Successful.\n` +
                                `Please follow this link to complete your Registration:\n` +
                                `${account_activate_url}`
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