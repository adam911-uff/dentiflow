// models/TypeSalle.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TypeSalle = sequelize.define('TypeSalle', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = TypeSalle;
