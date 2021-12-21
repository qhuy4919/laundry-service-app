const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('discount', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    discount_code: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    remaining: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
      }
    },
    percentage: {
      type: DataTypes.DECIMAL,
      validate: {
        min: 0,
        max: 1,
      }
    },
    minimum: {
      type: DataTypes.DECIMAL,
      defaultValue: 0.0,
    },
    start_time: {
      type: DataTypes.DATE,
    },
    end_time: {
      type: DataTypes.DATE,
    }
  }, {
    sequelize,
    tableName: 'discount',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "discount_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
