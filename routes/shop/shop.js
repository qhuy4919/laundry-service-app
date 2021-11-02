const path = require('path');
const ROOT_DIR = process.env.ROOT_DIR

// DAO
const {sequelize} = require(`${ROOT_DIR}/database/sequelize_object`)
var Models = require(`${ROOT_DIR}/models/init-models`)(sequelize);

// Consts
const { SHOP_URL } = require(`${ROOT_DIR}/const/api-urls.js`);

const token_auth = require(`${ROOT_DIR}/middleware/token-verify`)

module.exports = function (app, root_path) {
    // ---------------- GET method
    app.get(SHOP_URL+'/:id', /*token_auth,*/ async (req, res) => {
		try {
			var id = req.params.id;
			console.log(id);

			if (!isNumeric(id)) {
				return res.status(400).json({
					error: "Invalid shop id",
					msg: "Invalid Shop Id",
				})
			}

			var Shop = Models.laundry_shop;
			const shopobj = await Shop.findOne({
				where: {
					id: id,
				}
			})
			if (shopobj) {
				return res.status(200).json({
					data: shopobj,
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

function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}