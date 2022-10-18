const modeloSucursal = require('../Modelo/modeloSucursal');
const multer = require('multer');
const upload = multer({dest:'../public/'});
const{validationResult}=require('express-validator');
const { query } = require('express');
const mensaje = require('../componentes/mensaje');
const pool = require('../Configuracion/bd');

exports.crearSucursal = async (req,res)=>{

    const validacion = validationResult(req);
    
    if(!validacion.isEmpty())
    {
        mensaje("Verifique si ha llenado todos los campos de manera correcta",200, validacion.array(), res);
    }
    else
    {
        const {nombreSucursal,direccion} = req.body;
            await modeloSucursal.create({
                nombreSucursal:nombreSucursal,
                direccion:direccion,
            })
            .then((data)=>{
                console.log(data);
                //res.send("Registro Almacenado");
                mensaje("Registro Almacenado",200, validacion.array(), res);
            })
            .catch((error)=>{
                console.log(error);
                //res.send("Error al guardar los datos");
                mensaje("Error al guardar los datos",200, validacion.array(), res);
            })   
        
    }
};
exports.listarSucursal = async (req,res)=>{
    var mensajes = {
        estado: 200,
        mensaje: "Datos procesados correctamente",
    };
    console.log(req);
    const lista = await modeloSucursal.findAll();
    mensajes.data = lista;
    res.status(200).json(mensajes);
};
exports.listarUnSucursal = async (req,res)=>{
    const {idSucursal} =req.query;
    const listar = await modeloSucursal.findOne({
        where:
        {
            idSucursal:idSucursal
        }
    });
    
    if(!listar)
    {
        res.send("Sucedió un error");
    }
    else
    {
        var mensajes = {
            estado: 200,
            mensaje: "Datos procesados correctamente",
        };
        console.log(req);
        const lista = await modeloSucursal.findAll();
        mensajes.data = listar;
        res.status(200).json(mensajes);
    }
};
exports.modificarSucursal = async (req,res)=>{
    const validacion = validationResult(req);
    if(!validacion.isEmpty())
    {
        res.json(validacion.array());
    }
    else
    {
        const {idSucursal} = req.query;
        const {nombreSucursal,direccion}=req.body;
        var buscarSucursal = await modeloSucursal.findOne({
            where:{
                idSucursal:idSucursal,
            }
        });
        if(!buscarSucursal)
        {
            console.log("El id que mandaron no existe");
            res.send("Ha sucedido un error al encontrar su perfil");
        }
        else
        {
            buscarSucursal.nombreSucursal=nombreSucursal;
            buscarSucursal.direccion=direccion;

            await buscarSucursal.save()
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
    const{idSucursal} = req.query;

    var buscarpersona = await modeloSucursal.findOne({
        //una condición donde se pide que el id (de modelo) sea igual al id varibale de postman
        where:{
            idSucursal:idSucursal,
        }
    });

    //validación para saber si lo que se buscó está vacío o no
    if(!buscarpersona){
        console.log("El id que mandaron no existe");
        res.send("El id no existe");
    }
    else{

        await modeloSucursal.destroy({
            where:
            {
                idSucursal:idSucursal
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