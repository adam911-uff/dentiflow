// models/TypeDocument.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TypeDocument = sequelize.define('TypeDocument', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = TypeDocument;
