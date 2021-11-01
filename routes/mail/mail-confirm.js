const ROOT_DIR = process.env.ROOT_DIR;

// DAO
const {sequelize} = require(`${ROOT_DIR}/database/sequelize_object`)
var Models = require(`${ROOT_DIR}/models/init-models`)(sequelize);

// --
const { MAIL_CONFIRM_URL } = require(`${ROOT_DIR}/const/api-urls.js`);
const { error_msg_constructor } = require(`${ROOT_DIR}/utils/res-msg-constructor`);
const { ACTIVATION_TOKEN_LENGTH, AUTH_TOKEN_LENGTH } = require(`${ROOT_DIR}/const/values.js`)

const mailer = require(`${ROOT_DIR}/utils/mailer`);

function params_validate(params, err) {
    const { token } = params;
    if (!token) {
        err.push('Missing token key');
    } else
    if (token.length !== ACTIVATION_TOKEN_LENGTH) {
        console.log(token.length)
        err.push('Invalid Token');
    }
    if (err.length > 0) return false;
    return true;
}

module.exports = function (app) {
    app.get(MAIL_CONFIRM_URL, async function (req, res) {
        let error = [];
        console.log(req.query)
        if (!params_validate(req.query, error)) {
            // return res.status(400).json({
            //     error: error,
            //     msg: 'Bad Request'
            // })
            return res.status(400).sendFile(
                `${ROOT_DIR}/static/reaction/bad.html`
            );
        }
        const { token } = req.query;
        try {
            var user = await Models.user.findOne({
                attributes: ['id', 'email', 'nickname', 'active', 'token', 'token_created_at', 'is_persistent', ],
                where : {
                    'token': token,
                    'active': false,
                }
            })
            console.log(user)

            if (user === null) {
                //return res.status(400).json({
                //    error: "Result not found",
                //    msg: "Invalid Token",
                //})
                return res.status(404).sendFile(
                    `${ROOT_DIR}/static/reaction/notfound.html`
                );
            }

            // results = await pool.query(`UPDATE "user" SET "active" = TRUE WHERE "nickname"=$1`, [row.nickname]);
            user.update({
                'active': true,
                'token': null,
            }).then(() => {
                // return res.status(200).json({
                //     data: "Your account has been activated! You can now Sign-In",
                //     msg: "Mail Confirmation Succeeded"
                // })
                return res.status(200).sendFile(
                    `${ROOT_DIR}/static/reaction/ok.html`
                );
            }).catch((err) => {
                console.log("Error", err)
                // return res.status(500).json({
                //     error: err.toJSON(),
                //     msg: 'Error while Confirming Mail',
                // });
                return res.status(500).sendFile(
                    `${ROOT_DIR}/static/reaction/failed.html`
                );
            })
        } catch (err) {
            console.log("OK1")
            // return res.status(500).json({
            //     error: err,
            //     msg: 'Error while Confirming Mail',
            // });
            return res.status(500).sendFile(
                `${ROOT_DIR}/static/reaction/failed.html`
            );
        }
    })
}