const modeloServicios = require('../Modelo/modeloServicios');
const multer = require('multer');
const upload = multer({dest:'../public/'});
const{validationResult}=require('express-validator');
const { query } = require('express');
const mensaje = require('../componentes/mensaje');
const pool = require('../Configuracion/bd');

exports.crearServicios = async (req,res)=>{

    const validacion = validationResult(req);
    
    if(!validacion.isEmpty())
    {
        mensaje("Verifique si ha llenado todos los campos de manera correcta",200, validacion.array(), res);
    }
    else
    {
        const {nombreServicio} = req.body;
            await modeloServicios.create({
                nombreServicio:nombreServicio,
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
exports.listarServicios = async (req,res)=>{
    var mensajes = {
        estado: 200,
        mensaje: "Datos procesados correctamente",
    };
    console.log(req);
    const lista = await modeloServicios.findAll();
    mensajes.data = lista;
    res.status(200).json(mensajes);
};
exports.listarUnServicios = async (req,res)=>{
    const {idServicios} =req.query;
    const listar = await modeloServicios.findOne({
        where:
        {
            idServicios:idServicios
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
        const lista = await modeloServicios.findAll();
        mensajes.data = listar;
        res.status(200).json(mensajes);
    }
};
exports.modificarServicios = async (req,res)=>{
    const validacion = validationResult(req);
    if(!validacion.isEmpty())
    {
        res.json(validacion.array());
    }
    else
    {
        const {idServicios} = req.query;
        const {nombreServicio}=req.body;
        var buscarServicios = await modeloServicios.findOne({
            where:{
                idServicios:idServicios,
            }
        });
        if(!buscarServicios)
        {
            console.log("El id que mandaron no existe");
            res.send("Ha sucedido un error al encontrar su perfil");
        }
        else
        {
            buscarServicios.nombreServicio=nombreServicio;

            await buscarServicios.save()
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
    const{idServicios} = req.query;

    var buscarpersona = await modeloServicios.findOne({
        //una condición donde se pide que el id (de modelo) sea igual al id varibale de postman
        where:{
            idServicios:idServicios,
        }
    });

    //validación para saber si lo que se buscó está vacío o no
    if(!buscarpersona){
        console.log("El id que mandaron no existe");
        res.send("El id no existe");
    }
    else{

        await modeloServicios.destroy({
            where:
            {
                idServicios:idServicios
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