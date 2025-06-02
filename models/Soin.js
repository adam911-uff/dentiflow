
const RendezVous = require('../models/RendezVous');

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Soin = sequelize.define('Soin', {
  nature: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  dent: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prix: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }
});


Soin.belongsTo(RendezVous, { foreignKey: 'rendezVousId', as: 'rendezVous' });
RendezVous.hasMany(Soin, { foreignKey: 'rendezVousId', as: 'soins' });



module.exports = Soin;
