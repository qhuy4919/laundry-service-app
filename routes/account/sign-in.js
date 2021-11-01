const path = require('path');
const bcrypt = require('bcryptjs');

// Consts
const ROOT_DIR = process.env.ROOT_DIR
const { SIGN_IN_URL } = require(`${ROOT_DIR}/const/api-urls.js`);

// DAO
const {sequelize} = require(`${ROOT_DIR}/database/sequelize_object`)
var Models = require(`${ROOT_DIR}/models/init-models`)(sequelize);

// Funcs
const { tokenValidate, tokenGenerate } = require(`${ROOT_DIR}/utils/token`);
const token_auth = require(`${ROOT_DIR}/middleware/token-verify`);
const { error_msg_constructor } = require(`${ROOT_DIR}/utils/res-msg-constructor`)
const { BCRYPT_SALT, AUTH_TOKEN_LENGTH } = require(`${ROOT_DIR}/const/values.js`)

module.exports = function (app, root_path) {
    app.get(SIGN_IN_URL, function (req, res) {
        res.sendFile(path.join(root_path, 'static/login.html'))
    })
    .post(SIGN_IN_URL, async (req, res) => {
        try {
            const { email, password } = req.body;
            let errors = [];

            // Validate inputs
            if (! params_validate(req.body, errors)) {
                return res.status(400).json({
                    error: errors,
                    msg: 'Bad Request'
                });
            }

            const pw_hash = bcrypt.hashSync(password, BCRYPT_SALT);
            var user = await Models.user.findOne({
                where: {
                    "email": email,
                }
            })

            // Check if user exist and user is active
            if (user === null) 
                return res.status(404).json({
                    error: "User doesn't exist",
                    msg: 'Invalid Email or Password',
                });
            if (user.active === false) 
                return res.status(400).json({
                    error: "User is not active",
                    msg: 'Please check your mail and confirm your registration.'
                });
            // Match password hashes
            bcrypt.compare(password, user.password, function(err, res) {
                if (err) {
                    // console.log(err);
                    throw err;
                }
                if (res) {
                } else {
                    return res.status(404).json({
                        error: "User doesn't exist",
                        msg: 'Invalid Password',
                    });
                }
            });

            // Generate Token
            // TODO: Refresh token creation timestampt to keep all logged in devices remain log in
            const newTok = tokenGenerate(AUTH_TOKEN_LENGTH);
            await user.update({
                token: newTok,
                token_created_at: sequelize.fn('NOW'),
            })
            
            return res.status(200).json({
                data: {
                    token: newTok
                },
                msg: 'Sign-in Successful'
            });
        } catch(err) {
            console.log(err);
            return res.status(500).json({
                error: err.toJSON(),
                msg: 'Internal Error',
            });
        }
    })
}

function params_validate(params, err) {
    const { email , password } = params;

    if (!email || !password) {
        err.push("Please enter all fields");
    }
    else
    if (password.length < 2) {
        err.push( "Password must be a least 6 characters long");
    }
    if (err.length > 0) return false;
    return true;
}
