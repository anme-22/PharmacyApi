const fs = require('fs');
const path = require('path');
const msj = require('../componentes/mensaje');
const ModeloProductos = require('../Modelo/modeloProducto');
const pool = require('../Configuracion/bd');
exports.Recibir = async (req,res) => {
    const {filename} = req.file;
    const {idProducto} = req.body;
    console.log(req.file);
    console.log(idProducto);
    var BuscarProducto = await ModeloProductos.findOne({
        where: {
            idProducto : idProducto
        }

    });
    if(!BuscarProducto){
        msj("El producto no existe",200,[],res);
    } else{
        BuscarProducto.imagen = filename;
        await BuscarProducto.save()
        .then((data)=>{
            console.log(data);
            msj("Archivo Almacenado",200,[],res);
            pool.query(`Call InsertarImagen (:idProducto, :imagen)`,
            {replacements: {idProducto: idProducto, imagen: filename }})
        })
        .catch((error)=>{
            console.log(error);
            msj("Error al guardar la imagen",200,[],res);
        });
    }
    
};