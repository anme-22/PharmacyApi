const ModeloSucursal = require('../Modelo/modeloSucursal');
const { query } = require('express');
exports.verSucursal= async(req,res)=>{
    const {idSucursal}= req.query;
    const listar = await ModeloSucursal.findAll();
    if(!listar)
    {
        res.send("Sucedio un error");
    }
    else{
        res.json(listar);
        console.log("Se mostraron las sucursales");
    }
} 