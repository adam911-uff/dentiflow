const {DataTypes } = require ('sequelize');
const sequelize = require('../config/database');

const Salle = sequelize.define('Salle',{

    nom:{
        type :DataTypes.STRING,
        allowNull :false
    },

    type :{
        type:DataTypes.STRING,
        allowNull:false

    },
    etat :{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:'Disponible'
    }
}, {
    tableName :'salles',
    timestamps: true

});
module.exports = Salle;