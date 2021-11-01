const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order_review', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    rating: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    comment: {
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
    tableName: 'order_review',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "__constraint_idx__order_review__order_id",
        fields: [
          { name: "order_id" },
        ]
      },
      {
        name: "order_review_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
