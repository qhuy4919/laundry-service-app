const moment = require('moment')
const path = require('path');
const multer = require('multer')
const ROOT_DIR = process.env.ROOT_DIR

// DAO
const {sequelize} = require(`${ROOT_DIR}/database/sequelize_object`)
var Models = require(`${ROOT_DIR}/models/init-models`)(sequelize);
const { pool } = require(`${ROOT_DIR}/database/_old/db-config`);

// Consts
const { PROFILE_URL } = require(`${ROOT_DIR}/const/api-urls.js`);
const { error_msg_constructor } = require(`${ROOT_DIR}/utils/res-msg-constructor`)

const token_auth = require(`${ROOT_DIR}/middleware/token-verify`)

module.exports = function (app, root_path) {
    // ---------------- GET method
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
                msg: "Some Errors have occurred while fetching data at /profile"
            })
        } else {
            return res.status(200).json({
                data: result,
                msg: "OK"
            })
        }
    })
    // ---------- PUT method
    .put(PROFILE_URL, token_auth, async (request, response) => {
        try {
            const FIELDS = ['email', 'name', 'address', 'birthday', 'phone_number'];
            const params = request.body;
            var user = request.auth_user;

            let err = []
            if (! params_validate(params, err)) {
                return response.status(400).json({
                    error: err,
                    msg: "Bad Request",
                });
            }
            // console.log(err)

            for (var i=0; i<FIELDS.length; i++) {
                if (params[FIELDS[i]]) {
                    user.set({
                        [FIELDS[i]]: params[FIELDS[i]]
                    })
                }
            }

            // console.log(request.body)
            await (await user.save()).reload();
            // console.log(user);
            return response.status(204).json({
                data: {},
                msg: "Updated",
            });
        } catch (error) {
            try {
                if (error.parent.routine === "DateTimeParseError")
                    return response.status(400).json({
                        error: "Invalid Date",
                        msg: "Bad Request",
                    });
            } catch (error) {
            }
            console.log(error);
            return response.status(500).json({
                error,
                msg: "Internal Error",
            });
        }
    })
}

async function getFollowing(props, err) {
    const { user_id } = props;
    // console.log(user_id);
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
    // console.log(user_id);
    try {
        // const order_value = await pool.query(
        //     `SELECT "id", order_time, total_cost, order_status FROM "order" WHERE user_id = $1 `+
        //     `ORDER BY "id" DESC`, [user_id]
        // )
        const order_value = await Models.order.findAll({
            where: {
                user_id : user_id
            },
            raw: true,
            order: [
                ['id', 'DESC']
            ]
        })
        // console.log(order_value)
        var rows = []
        if (order_value) {
            order_value.forEach( (order) => {
                rows.push({
                    ...order,
                    order_time: moment(
                        (""+order.order_time).charAt(order.order_time.length-1) === 'Z' ?
                        order.order_time :
                        order.order_time+'Z'
                    ).local().format("YYYY-MM-DD HH:mm:ss")
                })
            })
        }

        // console.log(rows)
        return rows;
    } catch (error) {
        console.log(error);
        err.add(error)
    }
};

function params_validate(params, err) {
    if (params.email) {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(params.email)) err.push('Invalid Email')
    }
    if (params.phone_number) {
        var re = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
        if (!re.test(params.phone_number)) err.push('Invalid Phone Number')
    }
    //if (params.birth_day) {
    //    if (!moment(params.birth_day, "YYYY/MM/DD", true).isValid())
    //        err.push('Invalid Birthday')
    //}
    if (err.length > 0) return 0;
    return 1;
}