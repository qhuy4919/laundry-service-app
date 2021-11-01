const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nickname: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING(32),
      allowNull: true,
      defaultValue: "undisclosed"
    },
    role: {
      type: DataTypes.STRING(16),
      allowNull: true,
      defaultValue: "user"
    },
    profile_pic: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    phone_number: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    address: {
      type: DataTypes.JSON,
      allowNull: true
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    active: {
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
    },
    token: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    token_created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    is_persistent: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'user',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "user_email_key",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "user_nickname_key",
        unique: true,
        fields: [
          { name: "nickname" },
        ]
      },
      {
        name: "user_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
