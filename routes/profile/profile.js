const path = require('path');
const ROOT_DIR = process.env.ROOT_DIR

const { pool } = require(`${ROOT_DIR}/database/db-config`);
const { PROFILE_URL } = require(`${ROOT_DIR}/const/api-urls.js`);
const { error_msg_constructor } = require(`${ROOT_DIR}/helper/res-msg-constructor`)

module.exports = function (app, root_path) {

    app.get(PROFILE_URL, function (req, res) {
        res.sendFile(path.join(root_path, 'static/profile.html'))
        
        const { user_id } = req.body;
        pool.query(
            `SELECT nickname, "name", address, birthday, phone_number, "profile_pic" FROM "user" WHERE id = ${user_id}`
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
    })
}