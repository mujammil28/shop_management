const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Rating = sequelize.define('Rating', {
  rating: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = Rating;
