const moment = require('moment')
const path = require('path');
const ROOT_DIR = process.env.ROOT_DIR

// DAO
const { Op } = require('sequelize')
const {sequelize} = require(`${ROOT_DIR}/database/sequelize_object`)
var Models = require(`${ROOT_DIR}/models/init-models`)(sequelize);
const { pool } = require(`${ROOT_DIR}/database/_old/db-config`);

// Consts
const { ORDER_URL } = require(`${ROOT_DIR}/const/api-urls.js`);
const token_auth = require(`${ROOT_DIR}/middleware/token-verify`)
const admin_auth = require(`${ROOT_DIR}/middleware/user-admin`)

module.exports = function (app, root_path) {
    // ---------------- GET method
    app.get(ORDER_URL, token_auth, admin_auth, async (req, res) => {
        try {
            var orders = await Models.order.findAll({
                raw: true
            });

            orders = orders.map( (order) => {return {
                ...order,
                order_time: moment(order_time).local().format("YYYY-MM-DD HH:mm:ss")
            }})
            // console.log(orders)

            return res.status(200).json({
                msg: "OK",
                data: orders,
            })
        } catch (err) {
            return res.status(501).json({
                error: err,
            })
        }
    })
    // ---------------- POST method
    .post(ORDER_URL, token_auth, async (req, res) => {
        const auth_user = req.auth_user;
        const user_id = auth_user.id;

        // - parse request body
        console.log(req.body)
        const params = req.body;

        const name = auth_user.username; // don't get from params
        const address = params.address;
        const phone_number = params.phone_number;
        var note = params.note;
        const orderd = params.order_details;

        var shop_id = -1;
        if (params.shop_id) shop_id = params.shop_id
        else {
            console.log("Finding shop_id...")
            for (let i=0; i<Object.keys(orderd).length; i++) {
                let key = Object.keys(orderd)[i];
                const item = await Models.item.findOne({
                    where: {id: parseInt(key)}
                })
                if (!item) continue;
                const category = await Models.shop_category.findOne({
                    where: {id: parseInt(item.category_id)}
                })
                if (category) {
                    shop_id = category.shop_id;
                    break;
                }
            }
        }

        if (shop_id <= 0) {
            return res.status(400).json({
                msg: "Bad request."
            })
        }

        // TODO: fetch actual item price from DB because the request can be tamperred and modify so the user get different price 
        // For now just iterate the orderd
        let item_ids = [];
        let item_counts = [];
        let totalAmm = 0.0;
        Object.keys(orderd).map((key) => {
            const tmp = orderd[key]
            let price = tmp.detail.item_price;
            if (!isNaN(parseFloat(price))) {
                item_ids.push(tmp.detail.item_id);
                item_counts.push(tmp.count);
                totalAmm += parseFloat(price) * tmp.count;
            }
        })
        if (item_ids.length === 0) {
            return res.status(400).json({
                msg: "Bad request."
            })
        }

        // Discount code
        if (params.discount_code) {
            const now = moment();
            const dcode = params.discount_code;
            const discount = await Models.discount.findAll({
                where: {
                    discount_code: dcode,
                    minimum: {
                        [Op.lte]: totalAmm,
                    },
                    [Op.and]: {
                        start_time: {
                            [Op.or]: {
                                [Op.eq]: null,
                                [Op.lte]: now,
                            }
                        },
                        end_time: {
                            [Op.or]: {
                                [Op.eq]: null,
                                [Op.gte]: now,
                            }
                        },
                        remaining: {
                            [Op.gt]: 0
                        }
                    },
                },
                order: [
                    ['percentage', 'DESC'],
                    ['remaining', 'DESC'],
                ]
            }) 

            if (discount && discount.length > 0) {
                var coupon = discount[0];
                totalAmm *= (1.0 - coupon.percentage);
                coupon.remaining -= 1;
                coupon.save(); // Don't need to sync -> no await

                note = "Discounted by coupon ["+coupon.discount_code+"] by ["+ 
                        (coupon.percentage*100).toFixed(2) + "%]\n----\n" +
                        note;
            } else {
                // console.log("No valid coupons found.")
            }
        }

        Models.order.create({
           user_id: user_id,
           shop_id: shop_id,
           order_address: {'string':address},
           order_status: 'Pending',
           order_time: sequelize.fn('NOW'),
           total_cost: totalAmm, 
           note: note,
        }).then(async (result) =>  {
            const order_id = result.id;

            for (let i=0; i<item_ids.length; i++) {
                /*await*/ Models.order_item.create({ // TODO: Do we need to await?
                    item_id: item_ids[i],
                    order_id: order_id,
                    quantity: item_counts[i]
                });
            }

            return res.status(204).json()
        }).catch((error) => {
            console.log(error);
            return res.status(500).json({
                error: error,
                msg: "Some Errors have occurred while adding orders"
            })
        })

    })
}