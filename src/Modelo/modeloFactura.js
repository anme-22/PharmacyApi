const sequelize=require('sequelize');
const db = require('../Configuracion/bd');
const Factura=db.define(
    "factura",
    {
        idfactura:{
            type:sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull:false,
        },
        fechaVenta:{
            type:sequelize.DATE,
            allowNull:false,
        },
        idEmpleado:{
            type:sequelize.INTEGER,
            allowNull:false,
        },
        idSucursal:{
            type:sequelize.INTEGER,
            allowNull:false,
        },
        idCliente:{
            type:sequelize.INTEGER,
            allowNull:false,
        },
        isv:{
            type:sequelize.DOUBLE,
            allowNull:false,
        },
        descuentoTerceraEdad:{
            type:sequelize.DOUBLE,
            defaultValue:0,
            allowNull:false,
        },
        descuento:{
            type:sequelize.DOUBLE,
            defaultValue:0,
            allowNull:true,
        }
    },
    {
        tableName:"factura",
        timestamps:false,
    }
);

module.exports=Factura;

