const ModeloCliente = require('../Modelo/modeloCliente');
const multer = require('multer');
const upload = multer({dest:'../public/'});
const{validationResult}=require('express-validator');
const { query } = require('express');
const mensaje = require('../componentes/mensaje');
const pool = require('../Configuracion/bd');

exports.crearCliente = async (req,res)=>{

    const validacion = validationResult(req);
    
    if(!validacion.isEmpty())
    {
        mensaje("Verifique si ha llenado todos los campos de manera correcta",200, validacion.array(), res);
    }
    else
    {
        const {identificacion,nombre,apellido,numeroTelefono, direccion} = req.body;
            await ModeloCliente.create({
                idTipoIdentificacion:4,
                identificacion:identificacion,
                nombre:nombre,
                apellido:apellido,
                numeroTelefono:numeroTelefono,
                direccion:direccion
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
exports.listarCliente = async (req,res)=>{
    var mensajes = {
        estado: 200,
        mensaje: "Datos procesados correctamente",
    };
    console.log(req);
    const lista = await ModeloCliente.findAll();
    mensajes.data = lista;
    res.status(200).json(mensajes);
};
exports.listarUnCliente = async (req,res)=>{
    const {idCliente} =req.query;
    const listar = await ModeloCliente.findOne({
        where:
        {
            idCliente:idCliente
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
        const lista = await ModeloCliente.findAll();
        mensajes.data = listar;
        res.status(200).json(mensajes);
    }
};
exports.modificarCliente = async (req,res)=>{
    const validacion = validationResult(req);
    if(!validacion.isEmpty())
    {
        res.json(validacion.array());
    }
    else
    {
        const {idCliente} = req.query;
        const {identificacion,nombre,apellido,numeroTelefono,direccion}=req.body;
        var buscarCliente = await ModeloCliente.findOne({
            where:{
                idCliente:idCliente,
            }
        });
        if(!buscarCliente)
        {
            console.log("El id que mandaron no existe");
            res.send("Ha sucedido un error al encontrar su perfil");
        }
        else
        {
            buscarCliente.identificacion=identificacion;
            buscarCliente.nombre=nombre;
            buscarCliente.apellido=apellido;
            buscarCliente.numeroTelefono=numeroTelefono;
            buscarCliente.direccion=direccion;

            await buscarCliente.save()
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
    const{idCliente} = req.query;

    var buscarpersona = await ModeloCliente.findOne({
        //una condición donde se pide que el id (de modelo) sea igual al id varibale de postman
        where:{
            idCliente:idCliente,
        }
    });

    //validación para saber si lo que se buscó está vacío o no
    if(!buscarpersona){
        console.log("El id que mandaron no existe");
        res.send("El id no existe");
    }
    else{

        await ModeloCliente.destroy({
            where:
            {
                idCliente:idCliente
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