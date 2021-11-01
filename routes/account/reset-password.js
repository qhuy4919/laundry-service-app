const path = require('path');
const ROOT_DIR = process.env.ROOT_DIR;
var bcrypt = require("bcryptjs");

// DAO
const {sequelize} = require(`${ROOT_DIR}/database/sequelize_object`)
var Models = require(`${ROOT_DIR}/models/init-models`)(sequelize);

//
const { RESET_PASSWORD_URL } = require(`${ROOT_DIR}/const/api-urls.js`);
const { BCRYPT_SALT } = require(`${ROOT_DIR}/const/values.js`)

// Mail
const mailer = require(`${ROOT_DIR}/utils/mailer`);

function generate_password() {
    var new_password = require("crypto").randomBytes(16).toString('hex');
    return new_password
}

module.exports = function (app, root_path) {
    app.get(RESET_PASSWORD_URL, function (req, res) { 
        res.sendFile(path.join(root_path, 'static/reset-password.html'));
    })
    .post(RESET_PASSWORD_URL, async function (req, res) { // reset password
        let error = [];
        params_validate(req.body, error);
        if (error.length > 0) {
            return res.status(404).json({
                error: error,
                msg: 'User not found',
            });
        }
        //
        const { email } = req.body;
        var user = null;

        await Models.user.findOne({
            where: { email: email },
        }).then((result) => {
            user = result;
            if (! user.active) {
                return res.status(400).json({
                    error: 'Unactivated user',
                    msg: 'Please activate your account first',
                });
            }
        }).catch((err) => {
            console.log(`Error occurred at ModelUserFindone: ${err}`);
            return res.status(404).json({
                error: err,
                msg: 'User not found',
            });
        })

        const new_pw = generate_password();
        const hash_new_pw = bcrypt.hashSync(new_pw, BCRYPT_SALT);

        user.update({
            password: hash_new_pw
        }).then((result) => {
            console.log("Reset password: OK Updated")
            mailer.sendMail(req, res, 
                {   subject: RESET_PASSWORD_URL, 
                    content: `Password reset successful. ` +
                            `Here is your new password:\n\n` +
                            `${new_pw}\n\n`
                }
            )

            return res.status(200).json({
                data: "OK",
                msg: 'Password is Reset. Please check your mail for your new password.',
            });
        }).catch((err) => {
            console.log(err)
            return res.status(500).json({
                error: err.toJSON(),
                msg: 'Internal Error',
            });
        })
    })
}

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
