const Facture = require('./Facture');
// models/Paiement.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Paiement = sequelize.define('Paiement', {
  montant: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  mode: {
    type: DataTypes.ENUM('espèce', 'chèque', 'carte'),
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
});
// Facture().hasMany(Paiement, { foreignKey: 'factureId', as: 'paiements' });
Paiement.associate = (models) => {
    Paiement.hasMany(models.Facture, { foreignKey: 'factureId', as: 'facture' });
};
// Paiement.belongsTo(Facture, { foreignKey: 'factureId', as: 'facture' });


module.exports = Paiement;
