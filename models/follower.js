const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('follower', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    shop_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'follower',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "__constraint_idx__follower__shop_id",
        fields: [
          { name: "shop_id" },
        ]
      },
      {
        name: "__constraint_idx__follower__user_id",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "follower_pkey",
        unique: true,
        fields: [
          { name: "user_id" },
          { name: "shop_id" },
        ]
      },
    ]
  });
};
