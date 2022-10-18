const ModeloProducto = require('../Modelo/modeloProducto');
const { query } = require('express');
const { validationResult } = require('express-validator');
const mensaje = require('../componentes/mensaje');
const pool = require('../Configuracion/bd');
exports.verProductos = async (req,res)=>{
    const validacion=validationResult(req);
    var mensajes = {
        estado: 200,
        mensaje: "Datos procesados correctamente",
    };
    console.log(req);
    const lista = await ModeloProducto.findAll();
    mensajes.data = lista;
    res.status(200).json(mensajes);
    }
exports.verProducto = async (req,res)=>{
    const validacion=validationResult(req);
    if(!validacion.isEmpty())
    {
        res.json(validacion.array())
    }
    else
    {
        const {idProducto}= req.query;
        const listar = await ModeloProducto.findOne(
            {
            where:
                {
                    idProducto:idProducto
                }
            }
    );
        if(!listar)
        {
            res.send("Sucedio un error");
        }
        else
        {
            res.json(listar);
            console.log("Se mostró los productos");
        }
    }
};
exports.crearProducto= async(req,res)=>{
    const validacion= validationResult(req);
    if(!validacion.isEmpty())
    {
        res.json(validacion.array());
    }
    else
    {
        const {nombreProducto,precio,cantidadProducto}=req.body;
        await ModeloProducto.create({
            nombreProducto:nombreProducto,
            precio:precio,
            idTipoProducto:6,
            cantidadProducto:cantidadProducto,
            IdMarca:5
        })
        .then((data)=>{
            console.log(data);
            mensaje("Registro Almacenado",200, validacion.array(), res);
        })
        .catch((error)=>{
            console.log(error);
            mensaje("Error al guardar los datos",200, validacion.array(), res);
        })  
    }
};
exports.modificarProducto= async (req,res)=>{
    const validacion=validationResult(req);
    if(!validacion.isEmpty())
    {
        res.json(validacion.array());
    }
    else
    {
        const{idProducto}=req.query;
        const {nombreProducto,precio,cantidadProducto}=req.body;
        var buscarProducto = await ModeloProducto.findOne({
            where:{
            idProducto:idProducto
                }
            });
            if(!buscarProducto)
            {
                console.log("El id que mandaron no existe");
            }
            else
            {
                buscarProducto.nombreProducto=nombreProducto;
                buscarProducto.precio=precio,
                buscarProducto.cantidadProducto=cantidadProducto,
        

                await buscarProducto.save()
                .then((data)=>{
                    console.log("Se actualizó \n"+data);
                    mensaje("Registro Actualizado",200, validacion.array(), res);
                })
                .catch((error)=>{
                    console.log("no se actualizó \n"+error);
                    mensaje("Erro en el registro",200, validacion.array(), res);
                })
            }
    }
};
exports.eliminar = async (req,res) =>
{
    const validacion = validationResult(req);
    const{idProducto} = req.query;

    var buscarpersona = await ModeloProducto.findOne({
        //una condición donde se pide que el id (de modelo) sea igual al id varibale de postman
        where:{
            idProducto:idProducto,
        }
    });

    //validación para saber si lo que se buscó está vacío o no
    if(!buscarpersona){
        console.log("El id que mandaron no existe");
        res.send("El id no existe");
    }
    else{

        await ModeloProducto.destroy({
            where:
            {
                idProducto:idProducto
            }
        })
        .then((data)=>{
            console.log("Se eliminó \n"+data);
            //una respuesta para el usuario
            mensaje("Registro eliminado",200, validacion.array(), res);
        })
        .catch((error)=>{
            console.log("no se eliminó \n"+error);
            mensaje("error",200, validacion.array(), res);
        })
    }
}
