// models/ReferenceDent.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ReferenceDent = sequelize.define('ReferenceDent', {
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
  },
});

module.exports = ReferenceDent;
