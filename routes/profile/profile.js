const { error } = require('console');
const { errorMonitor } = require('events');
const path = require('path');
const ROOT_DIR = process.env.ROOT_DIR

// DAO
const {sequelize} = require(`${ROOT_DIR}/database/sequelize_object`)
var Models = require(`${ROOT_DIR}/models/init-models`)(sequelize);
const { pool } = require(`${ROOT_DIR}/database/_old/db-config`);

// Consts
const { PROFILE_URL } = require(`${ROOT_DIR}/const/api-urls.js`);
const { error_msg_constructor } = require(`${ROOT_DIR}/utils/res-msg-constructor`)

const token_auth = require(`${ROOT_DIR}/middleware/token-verify`)

async function getFollowing(props, err) {
    const { user_id } = props;
    console.log(user_id);
    try {
        const followings = await pool.query(
            `SELECT "fl"."shop_id", "fl"."user_id" AS "owner_id", "ls"."shop_name", "ls"."rating", "ls"."shop_profile_pic" `+
            `FROM "follower" AS "fl" LEFT JOIN "laundry_shop" AS "ls" ON "fl"."shop_id" = "ls"."id" `+
            `WHERE "fl"."user_id" = $1`, [user_id]
        )
        return followings.rows;
    } catch (error) {
        console.log(error);
        err.add(error)
    }
};

async function getOrderList(props, err) {
    const { user_id } = props;
    console.log(user_id);
    try {
        const order_value = await pool.query(
            `SELECT order_time, total_cost, order_status FROM "order" WHERE user_id = $1`, [user_id]
        )
        return order_value.rows;
    } catch (error) {
        console.log(error);
        err.add(error)
    }
};


module.exports = function (app, root_path) {
    app.get(PROFILE_URL, token_auth, async (req, res) => {
        let err = [];

        const auth_user = req.auth_user;
        const user_id = auth_user.id;

        var result = { 'info': null, 'order': null, 'following': null };
        result['info'] = auth_user;
        result['order'] = (await getOrderList({ user_id }, err));
        result['following'] = (await getFollowing({ user_id }, err));
        // res.sendFile(path.join(root_path, 'static/profile.html'));
        // console.log(result)

        if (err.length > 0) {
            return res.status(200).json({
                error: err,
                data: result,
                msg: "Error occurred while fetching data at /profile"
            })
        } else {
            return res.status(200).json({
                data: result,
                msg: "OK"
            })
        }
    })
}