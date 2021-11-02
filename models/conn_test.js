const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('conn_test', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    msg: {
      type: DataTypes.STRING(1024),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'conn_test',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "conn_test_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
