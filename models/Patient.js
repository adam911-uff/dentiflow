const sequelize = require("../config/database");
const {DataTypes} = require ("sequelize");

 const Patient = sequelize.define ("Patient",{


    nom : {
        type: DataTypes.STRING,
        allowNull :false,
    },
    prenom : {
        type : DataTypes.STRING ,
        allowNull :false ,
    },
     sexe :{
        type : DataTypes.ENUM("Homme","Femmme"),
        allowNull : false ,

     },
     age : {
        type: DataTypes.INTEGER,
        allowNull:false,
     },

     telephone : {

        type :DataTypes.STRING,
        allowNull :false,
     },
     email : {
     type : DataTypes.STRING,
     allowNull:false,
     unique:true,
     validate:{
        isEmail:true,
     },
    },

    etat :{
        type: DataTypes.ENUM("marié", "célibataire","divorcé","veuf"),

    },
    nb_enfants:{
        type:DataTypes.INTEGER,
        defaultValue : 0,
    },
    cnss:{
        type :DataTypes.STRING,
        unique:true,
    },
},{
    tableName:'Patients',
    timestamps:true,
}

 );
 
 module.exports = Patient;