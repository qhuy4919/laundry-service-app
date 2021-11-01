const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('follower', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: 'user',
      referencesKey: 'id',
    },
    shop_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: 'laundry_shop',
      referencesKey: 'id',
    }
  }, {
    sequelize,
    freezeTableName: true,
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
