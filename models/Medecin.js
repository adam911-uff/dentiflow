const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Salle = require('./Salle');



const Medecin = sequelize.define('Medecin', {
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    specialite: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sexe: {
      type: DataTypes.ENUM("Homme", "Femme"),
      allowNull: false,
    },
    salaire: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    telephone: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });


  Medecin.belongsTo(Salle, {
    foreignKey: 'salleId',  // Clé étrangère dans Medecin
    as: 'salle',            // Alias (utilisé pour les requêtes)
  });
  
  module.exports = Medecin;
