const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    shop_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    order_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    order_address: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    order_status: {
      type: DataTypes.STRING(256),
      allowNull: false,
      defaultValue: ""
    },
    total_cost: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0.0
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: ""
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
    tableName: 'order',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "__constraint_idx__order__order_state",
        fields: [
          { name: "order_status" },
        ]
      },
      {
        name: "__constraint_idx__order__shop_id",
        fields: [
          { name: "shop_id" },
        ]
      },
      {
        name: "__constraint_idx__order__user_id",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "order_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
