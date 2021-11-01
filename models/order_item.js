const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order_item', {
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'order_item',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "__constraint_idx__order_item__item_id",
        fields: [
          { name: "item_id" },
        ]
      },
      {
        name: "__constraint_idx__order_item__order_id",
        fields: [
          { name: "order_id" },
        ]
      },
      {
        name: "order_item_pkey",
        unique: true,
        fields: [
          { name: "item_id" },
          { name: "order_id" },
        ]
      },
    ]
  });
};
