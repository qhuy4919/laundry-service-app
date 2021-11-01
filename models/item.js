const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('item', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    item_name: {
      type: DataTypes.STRING(256),
      allowNull: false,
      defaultValue: ""
    },
    item_pic: {
      type: DataTypes.STRING(1024),
      allowNull: true,
      defaultValue: "NULL"
    },
    item_detail: {
      type: DataTypes.STRING(1024),
      allowNull: false,
      defaultValue: ""
    },
    item_status: {
      type: DataTypes.STRING(256),
      allowNull: false,
      defaultValue: ""
    },
    item_price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0.0
    },
    hidden: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'item',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "__constraint_idx__item__category_id",
        fields: [
          { name: "category_id" },
        ]
      },
      {
        name: "item_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
