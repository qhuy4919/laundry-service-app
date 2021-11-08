const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('laundry_shop', {
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
    shop_name: {
      type: DataTypes.STRING(1024),
      allowNull: false
    },
    shop_address: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    shop_detail: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: ""
    },
    shop_profile_pic: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    working_time: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    follower_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    rating: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
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
    freezeTableName: true,
    underscored: true,
    tableName: 'laundry_shop',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "__constraint_idx__laundry_shop__user_id",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "laundry_shop_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
