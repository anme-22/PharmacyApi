const sequelize=require('sequelize');
const db = require('../Configuracion/bd');
const TipoIdentificacion=db.define(
    "TipoIdentificacion",
    {
        idtipoIdentificacion:{
            type:sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull:false,
        },
        descripcionTipo:{
            type:sequelize.STRING(45),
            allowNull:false,
        }
    },
    {
        tableName:"TipoIdentificacion",
        timestamps:false,
    }
);

module.exports=TipoIdentificacion;