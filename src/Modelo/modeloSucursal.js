const sequelize= require('sequelize');
const db = require('../Configuracion/bd');
const Sucursal = db.define(
    "sucursal",
    {
        idSucursal:{
            type:sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false,

        },
        nombreSucursal:{
            type:sequelize.STRING(45),
            allowNull:false,
        },
        direccion:{
            type:sequelize.STRING(100),
            allowNull:false,
        }
    },
    {
        tablename:"sucursal",
        timestamps:false,
    }
);
module.exports=Sucursal;