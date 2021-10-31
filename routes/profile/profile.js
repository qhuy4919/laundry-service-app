const { error } = require('console');
const { errorMonitor } = require('events');
const path = require('path');
const ROOT_DIR = process.env.ROOT_DIR

const { pool } = require(`${ROOT_DIR}/database/db-config`);
const { PROFILE_URL } = require(`${ROOT_DIR}/const/api-urls.js`);
const { error_msg_constructor } = require(`${ROOT_DIR}/helper/res-msg-constructor`)

async function ProfileUser(profile) {
    const { user_id } = profile;
    console.log(user_id);
    try {
        const profile_value = await pool.query(`SELECT nickname, "name", address, birthday, phone_number, "profile_pic" FROM "user" WHERE id = ${user_id}`)
        return res.status(200).json(profile_value[0])
    } catch (error) {
        throw new Error('Error')
    }
}

async function Follower(follower) {
    const { user_id } = follower;
    console.log(user_id);
    try {
        const follower_value = await pool.query(`SELECT COUNT(shop_id) AS follower FROM follower GROUP BY follower.user_id HAVING user_id = ${user_id}`)
        return res.json(follower_value);
    } catch (error) {
        throw new Error('Error')
    }
};

async function OrderList(order) {
    const { user_id } = order;
    console.log(user_id);
    try {
        const order_value = await pool.query(`SELECT order_time, total_cost, order_status FROM "order" WHERE user_id = ${user_id}`)
        return res.json(order_value);
    } catch (error) {
        throw new Error('Error')
    }
};

async function TotalOrder(total) {
    const { user_id } = total;
    console.log(user_id);
    try {
        const total_value = await pool.query(`SELECT COUNT(user_id) AS total_orders FROM "order" GROUP BY user_id HAVING user_id = ${user_id}`)
        return res.json(total_value);
    } catch (error) {
        throw new Error('Error')
    }
};

module.exports = function (app, root_path) {
    app.get(PROFILE_URL, (req, res) => {
        const user_id = parseInt(req.params.id);
        var result = [];
        result.push(ProfileUser({ user_id }));
        result.push(OrderList({ user_id }));
        result.push(Follower({ user_id }));
        result.push(TotalOrder({ user_id }));
        res.sendFile(path.join(root_path, 'static/profile.html'));
        if (result) {
            return res.status(200).json({
                result: result,
            })
        }
    })
}