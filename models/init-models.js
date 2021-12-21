var DataTypes = require("sequelize").DataTypes;
var _conn_test = require("./conn_test");
var _follower = require("./follower");
var _item = require("./item");
var _laundry_shop = require("./laundry_shop");
var _order = require("./order");
var _order_item = require("./order_item");
var _order_review = require("./order_review");
var _shop_category = require("./shop_category");
var _user = require("./user");
var _discount = require("./discount");

function initModels(sequelize) {
  var conn_test = _conn_test(sequelize, DataTypes);
  var follower = _follower(sequelize, DataTypes);
  var item = _item(sequelize, DataTypes);
  var laundry_shop = _laundry_shop(sequelize, DataTypes);
  var order = _order(sequelize, DataTypes);
  var order_item = _order_item(sequelize, DataTypes);
  var order_review = _order_review(sequelize, DataTypes);
  var shop_category = _shop_category(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var discount = _discount(sequelize, DataTypes);


  return {
    conn_test,
    follower,
    item,
    laundry_shop,
    order,
    order_item,
    order_review,
    shop_category,
    user,
    discount,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
