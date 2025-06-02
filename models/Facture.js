const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Facture = sequelize.define('Facture', {
    reference: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    montant_totale: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    état: {
      type: DataTypes.ENUM('généré', 'confirmé', 'annulé'),
      defaultValue: 'généré',
    }
  });
  
  module.exports = Facture;

  Facture.associate = (models) => {
    Facture.hasMany(models.Paiement, { foreignKey: 'factureId', as: 'paiements' });
  };

  return Facture;

