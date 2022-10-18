const sequelize= require('sequelize');
const db = require('../Configuracion/bd');
const Servicios = db.define(
    "servicios",
    {
        idServicios:{
            type:sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false,

        },
        nombreServicio:{
            type:sequelize.STRING(45),
            allowNull:false,
        }
    },
    {
        tablename:"servicios",
        timestamps:false,
    }
);
module.exports=Servicios;