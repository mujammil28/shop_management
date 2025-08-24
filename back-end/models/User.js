const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcryptjs');

const User = sequelize.define(
  'User',
  {
    name: { type: DataTypes.STRING(60), allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING(400), allowNull: false },
    role: { type: DataTypes.ENUM('admin', 'user', 'owner'), allowNull: false },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
      },
    },
  }
);

module.exports = User;
