const ROOT_DIR = process.env.ROOT_DIR;

const { pool } = require(`${ROOT_DIR}/database/db-config`);
const { MAIL_CONFIRM_URL } = require(`${ROOT_DIR}/const/api-urls.js`);
const { error_msg_constructor } = require(`${ROOT_DIR}/helper/res-msg-constructor`);

const emailController = require('../../util/email-controller');

function params_validate(params, err) {
    const { email, token } = params;
    if (!token || !email) {
        err.push('Please Input all Required Fields');
    }
    if (err.length > 0) return false;
    return true;
}

module.exports = function (app) {
    app.post(MAIL_CONFIRM_URL, async function (req, res) {
        const { email, token } = req.body;
        let error = [];

        if (!params_validate(req.body, error)) {
            return res.status(400).json({
                error: error,
                msg: 'Bad Request'
            })
        }

        try {
            var results;
            results = await pool.query(`SELECT "email", "nickname", "token_created_at", \
                                "is_persistent" FROM "user" WHERE "token" = $1 AND "email" = $2`, [token, email])
            if (results.rows.length <= 0) {
                return res.status(400).json({
                    error: "Invalid Token or Invalid Email",
                    msg: "Invalid Token or Invalid Email"
                })
            }
            const row = results.rows[0];

            results = await pool.query(`UPDATE "user" SET "active" = TRUE WHERE "nickname"=$1`, [row.nickname]);
            return res.status(200).json({
                data: "Your account has been activated! You can now Sign-In",
                msg: "Mail Confirmation Succeeded"
            })
        } catch (err) {
            return res.status(500).json({
                error: err,
                msg: 'Error while Confirming Mail',
            });
        }
    })
}