const path = require('path');
const ROOT_DIR = process.env.ROOT_DIR

// DAO
const {sequelize} = require(`${ROOT_DIR}/database/sequelize_object`)
var Models = require(`${ROOT_DIR}/models/init-models`)(sequelize);
const { pool } = require(`${ROOT_DIR}/database/_old/db-config`);

// Consts
const { SHOP_URL } = require(`${ROOT_DIR}/const/api-urls.js`);

const token_auth = require(`${ROOT_DIR}/middleware/token-verify`)

module.exports = function (app, root_path) {
    // ---------------- GET method
    app.get(SHOP_URL+'/:id', /*token_auth,*/ async (req, res) => {
		try {
			var id = req.params.id;
			// console.log(id);

			if (!isNumeric(id)) {
				return res.status(400).json({
					error: "Invalid shop id",
					msg: "Invalid Shop Id",
				})
			}

			var Shop = Models.laundry_shop;
			var shopobj = await Shop.findOne({
				where: {
					id: id,
				}
			})
			if (shopobj) {
				const categories = await getServices({id});
				return res.status(200).json({
					data: {...shopobj.toJSON(), categories},
					msg: "OK",
				})
			}
			return res.status(404).json({
				error: "Shop Not Found",
				msg: "Shop could not be found",
			})
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				error: error,
				msg: "Something went wrong",
			})
		} 
    })
}

async function getServices(props) {
    const { id } = props;
    try {
		console.log("Executing: Get services of shop with id:", id);
        const services = await pool.query(
			`SELECT "shop_category"."category_name", "shop_category"."hidden" as "cate_hidden",
			"item"."id" as "item_id", "item"."category_id", "item"."item_name", "item"."item_detail", "item"."item_status", "item"."item_price", "item"."hidden" as "item_hidden" 
			FROM "shop_category" JOIN "item" ON "shop_category"."id"="item"."category_id" where "shop_id"=$1;`
            ,[id]
        )

		var categories = []
		var mapper = {}
		for (var i=0; i<services.rows.length; i++) {
			const row = services.rows[i];
			if (mapper[row.category_id] === undefined) {
				mapper[row.category_id] = categories.length
				categories.push({})
			}
			const idx = mapper[row.category_id]

			categories[idx].category_name = row.category_name
			categories[idx].hidden = row.cate_hidden
			categories[idx].category_id = row.category_id

			if (categories[idx].items === undefined)
				categories[idx].items = []
			
			categories[idx].items.push({
				"item_id": row.item_id,
				"item_name": row.item_name,
				"item_detail": row.item_detail,
				"item_status": row.item_status,
				"item_price": row.item_price,
				"item_hidden": row.item_hidden
			})
		}

        return categories;
    } catch (error) {
        console.log(error);
        err.add(error)
    }
}

function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}