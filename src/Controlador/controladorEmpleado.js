const ModeloEmpleado = require('../Modelo/modeloEmpleado');
const bcrypt = require('bcrypt');
const multer = require('multer');
const upload = multer({dest:'../public/'});
const{validationResult}=require('express-validator');
const { query } = require('express');
const mensaje = require('../componentes/mensaje');
const pool = require('../Configuracion/bd');

exports.crearEmpleado = async (req,res)=>{

    const validacion = validationResult(req);
    
    if(!validacion.isEmpty())
    {
        mensaje("Verifique si ha llenado todos los campos de manera correcta",200, validacion.array(), res);
    }
    else
    {
        const {nombreEmpleado,apellidoEmpleado,correoElectronico,contraseña,numeroTelefono,
            direccion,numeroIdentidad} = req.body;

            const contraEncriptada = await bcrypt.hash(contraseña, 10);

            await ModeloEmpleado.create({
                nombreEmpleado:nombreEmpleado,
                apellidoEmpleado:apellidoEmpleado,
                correoElectronico:correoElectronico,
                contraseña:contraEncriptada,
                numeroTelefono:numeroTelefono,
                direccion:direccion,
                idTipoEmpleado:4,
                numeroIdentidad:numeroIdentidad
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
exports.listarEmpleado = async (req,res)=>{
    var mensajes = {
        estado: 200,
        mensaje: "Datos procesados correctamente",
    };
    console.log(req);
    const lista = await ModeloEmpleado.findAll();
    mensajes.data = lista;
    res.status(200).json(mensajes);
};
exports.listarUnEmpleado = async (req,res)=>{
    const {idEmpleados} =req.query;
    const listar = await ModeloEmpleado.findOne({
        where:
        {
            idEmpleados:idEmpleados
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
        const lista = await ModeloEmpleado.findAll();
        mensajes.data = listar;
        res.status(200).json(mensajes);
    }
};
exports.modificarEmpleado = async (req,res)=>{
    const validacion = validationResult(req);
    if(!validacion.isEmpty())
    {
        res.json(validacion.array());
    }
    else
    {
        const {idEmpleados} = req.query;
        const {nombreEmpleado,apellidoEmpleado,numeroTelefono,direccion}=req.body;
        var buscarEmpleado = await ModeloEmpleado.findOne({
            where:{
                idEmpleados:idEmpleados,
            }
        });
        if(!buscarEmpleado)
        {
            console.log("El id que mandaron no existe");
            res.send("Ha sucedido un error al encontrar su perfil");
        }
        else
        {
            buscarEmpleado.nombreEmpleado=nombreEmpleado;
            buscarEmpleado.apellidoEmpleado=apellidoEmpleado;
            buscarEmpleado.numeroTelefono=numeroTelefono;
            buscarEmpleado.direccion=direccion;

            await buscarEmpleado.save()
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
    const{idEmpleados} = req.query;

    var buscarpersona = await ModeloEmpleado.findOne({
        //una condición donde se pide que el id (de modelo) sea igual al id varibale de postman
        where:{
            idEmpleados:idEmpleados,
        }
    });

    //validación para saber si lo que se buscó está vacío o no
    if(!buscarpersona){
        console.log("El id que mandaron no existe");
        res.send("El id no existe");
    }
    else{

        await ModeloEmpleado.destroy({
            where:
            {
                idEmpleados:idEmpleados
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