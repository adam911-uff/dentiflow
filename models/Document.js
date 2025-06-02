const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Patient = require('./Patient');
const RendezVous = require ('./RendezVous')


const Document = sequelize.define('Document', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING, // ex: radio, ordonnance, analyse...
    allowNull: false,
  },
  nature: {
    type: DataTypes.STRING, // ex: pdf, png, jpg...
    allowNull: false,
  },
  cheminFichier: {
    type: DataTypes.STRING, // chemin ou nom fichier stocké
    allowNull: false,
  }
});

// Association avec patient
Document.belongsTo(Patient, { foreignKey: 'patientId', as: 'patient' });
Patient.hasMany(Document, { foreignKey: 'patientId', as: 'documents' });

Document.belongsTo(RendezVous, { foreignKey: 'rendezVousId', as: 'rendezVous' });
RendezVous.hasMany(Document, { foreignKey: 'rendezVousId' });
module.exports = Document;