const sequelize=require('sequelize');
const db = require('../Configuracion/bd');
const Detallefactura=db.define(
    "detallefactura",
    {
        idProducto:{
            type:sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull:false,
        },
        idFactura:{
            type:sequelize.INTEGER,
            primaryKey: true,
            allowNull:false,
        },
        cantidad:{
            type:sequelize.INTEGER,
            allowNull:false,
        },
        descuentoProducto:{
            type:sequelize.DOUBLE,
            allowNull:false,
        },
        precioProducto:{
            type:sequelize.INTEGER,
            allowNull:false,
        }
    },
    {
        tableName:"detallefactura",
        timestamps:false,
    }
);

module.exports=Detallefactura;