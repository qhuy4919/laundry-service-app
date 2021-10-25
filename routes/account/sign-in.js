const path = require('path');
const ROOT_DIR = process.env.ROOT_DIR

const { pool } = require(`${ROOT_DIR}/database/db-config`);
const { SIGN_IN_URL } = require(`${ROOT_DIR}/const/api-urls.js`);

const { tokenValidate, tokenGenerate } = require(`${ROOT_DIR}/helper/token`);

const { error_msg_constructor } = require(`${ROOT_DIR}/helper/res-msg-constructor`)

const bcrypt = require('bcryptjs');

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

const token_auth = require(`${ROOT_DIR}/middleware/token-verify`);

module.exports = function (app, root_path) {
    app.get(SIGN_IN_URL, function (req, res) {
        res.sendFile(path.join(root_path, 'static/login.html'))
    })
    .post(SIGN_IN_URL, async (req, res) => {
        const { nickname, password } = req.body;
        let errors = [];

        // Validate inputs
        if (! params_validate(req.body, errors)) {
            return res.status(400).json({
                error: errors,
                msg: 'Bad Request'
            });
        }

        ;(async () => {
            var results;
            results = await pool.query(`SELECT * FROM "user" WHERE nickname = $1`, [nickname])

            if (results.rows.length <= 0) {
                return res.status(404).json({
                    // error: 'Invalid nickname or password',
                    error: 'Cannot find such User', // TODO: Use the line above 
                    msg: 'Sign-In Failed',
                });
            }
            var user = results.rows[0]; // First result

            // Check if active
            if (!user.active) {
                return res.status(401).json({
                    error: 'Please Confirm Mail', 
                    msg: 'Please Confirm your Registration before Signing In',
                });
            }

            // Check if given password hash matches with stored hash
            var pw_hash_is_matched = bcrypt.compareSync(password, user.password); 
            if (! pw_hash_is_matched) { // hashes doesn't match
                return res.status(404).json({
                    // error: 'Invalid nickname or password',
                    error: 'Invalid Login Credentials', // TODO: Use the line above 
                    msg: 'Sign-In Failed',
                });
            }

            // -- OK pass password check
            // TODO: Get or Create Token
            if (! user.is_persistent || ! tokenValidate(user.token, user)) { 
                // Not persistent Token or Token is invalid -> generate a new one
                var new_tok = tokenGenerate();
            }

            results = await pool.query(`UPDATE "user" SET "token" = $1, "token_created_at" = NOW() WHERE "nickname" = $2`, 
                            [new_tok, nickname]);
            if (results.rowCount == 0) {
                return res.status(500).json({
                    error: err,
                    msg: 'Nothing Changed'
                });
            }

            // Fetch the user again
            results = await pool.query(`SELECT * FROM "user" WHERE nickname = $1`, [nickname])
            return res.status(200).json({
                data: results.rows[0],
                msg: 'Sign-in Succeeded',
            });
        })().catch(err => {
            if (err) {
                return res.status(500).json({
                    error: error_msg_constructor('Internal Error', err),
                    msg: '',
                });
            }
        })
    })
}