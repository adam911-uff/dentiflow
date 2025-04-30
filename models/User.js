const{ DataTypes } = require ('sequelize');
const sequelize = require ('../config/database');


const User =sequelize.define ('User',{
    email: {
        type :DataTypes.STRING,
        allowNull: false ,
        unique : true ,
        validate: {
            isEmail:true
        }
    },
    password :{
        type: DataTypes.STRING,
        allowNull :false
    }, 
    etat: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'activé' 
      },
    role : {
        type: DataTypes.STRING,
        allowNull : false,
        defaultValue:'user'
    }
}, {
    tableName: 'users',
    timestamps: true 
}

);

module.exports = User;