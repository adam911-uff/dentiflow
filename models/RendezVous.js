const  {DataTypes} = require('sequelize');
const sequelize = require ('../config/database');
const Patient = require('./Patient');// Association avec les patients
const Salle = require('./Salle');
const Medecin  = require('./Medecin');


const RendezVous =sequelize.define('RendezVous',{
    
   
    date : {
        type :DataTypes.DATE,
        allowNull :false,
    
    
    },
    etat : { 
        type:DataTypes.ENUM('programée','effectuée','annulée'),
        defaultValue: 'programée',
    

    },
    motif :{
        type :DataTypes.STRING,
    }

});

RendezVous.belongsTo(Patient,{ foreignKey: 'patientId', as:'patient'});
Patient.hasMany(RendezVous,{foreignKey:'patientId'});

RendezVous.belongsTo(Salle,{foreignKey :'salleId',as:'salle'});
Salle.hasMany(RendezVous,{foreignKey:'salleId'});

RendezVous.belongsTo(Medecin,{foreignKey :'medecinId',as:'medecin'});
Medecin.hasMany(RendezVous,{foreignKey:'medecinId'});



module.exports = RendezVous;