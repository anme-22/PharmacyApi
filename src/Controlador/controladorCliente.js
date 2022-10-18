const ModeloCliente = require('../Modelo/modeloCliente');
const ModeloTipoIdentificacion = require('../Modelo/modeloTipoIdentificacion');
const bcrypt = require('bcrypt');
const multer = require('multer');
const upload = multer({dest:'../public/'});
const{validationResult}=require('express-validator');
const { query } = require('express');
const mensaje = require('../componentes/mensaje');

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

exports.actualizar2= async(req, res) => {
    const { idCliente, nombre, apellido, direccion, numeroTelefono } = req.body;
    
    if(!idCliente)
    {
        res.send("Favor enviar un ID")
    }
    else
    {
        var buscarCliente=await cliente.findOne({
            where:{
                idCliente:idCliente,
            }
        });
        if(!buscarCliente)
        {
            res.send("No existe el id")
        }
        else{
            if(!idCliente || !nombre || !apellido || !direccion || !numeroTelefono)
            {
                res.send("Envie todos los datos")
            }
            else{
                buscarCliente.idCliente=idCliente;
                buscarCliente.nombre=nombre;
                buscarCliente.apellido=apellido;
                buscarCliente.direccion=direccion;
                buscarCliente.numeroTelefono=numeroTelefono;
                await buscarCliente.save();

                pool.query('CALL ActualizarClientes (:idCliente, :nombre, :apellido, :direccion, :numeroTelefono)', 
                        {replacements: { idCliente: idCliente, nombre: nombre, apellido: apellido, direccion: direccion, numeroTelefono:numeroTelefono,}})
                .then(v=>console.log(v));

                console.log(buscarCliente);
                res.send("Cliente actualizado");
            }
        }
    }
};



exports.verPerfil = async (req,res)=>{
    const {idCliente} =req.query;
    const listar = await ModeloCliente.findOne({
        where:
        {
            idCliente:idCliente
        }
    });
    
    if(!listar)
    {
        mensaje("Sucedió un error",200, listar, res);
        //res.send("Sucedió un error");
    }
    else
    {
        //res.json(listar);
        mensaje("Ver perfil",200, listar, res);
        console.log("Se mostraron las personas");
        console.log(listar);
    }
};

exports.crearPerfil = async (req,res)=>{

    const validacion = validationResult(req);
    
    if(!validacion.isEmpty())
    {
        mensaje("Verifique si ha llenado todos los campos de manera correcta",200, validacion.array(), res);
        //res.json(validacion.array());
    }
    else
    {
        const {identificacion,nombre,apellido,correoElectronico,contraseña,numeroTelefono,
            direccion,fechaNacimiento} = req.body;
    
        const buscaTipoIdentificacion = await ModeloTipoIdentificacion.findOne({
            where:
            {
                idtipoIdentificacion:1
            } 
        });
        if(!buscaTipoIdentificacion)
        {
            mensaje("No se puede registrar con ese tipo de identificacion",200, validacion.array(), res);
            //res.send("No se puede registrar con ese tipo de identificacion");
        }
        else
        {
            //Proceso de encriptación
            //const salt = await bcrypt.genSalt();
            const contraEncriptada = await bcrypt.hash(contraseña, 10);
            //console.log(contraEncriptada);
            //console.log(contraseña);

            await ModeloCliente.create({
                idTipoIdentificacion:1,
                identificacion:identificacion,
                nombre:nombre,
                apellido:apellido,
                correoElectronico:correoElectronico,
                contraseña:contraEncriptada,
                numeroTelefono:numeroTelefono,
                direccion:direccion,
                fechaNacimiento:fechaNacimiento
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
    }
};

exports.modificarPerfil = async (req,res)=>{
    const validacion = validationResult(req);
    if(!validacion.isEmpty())
    {
        res.json(validacion.array());
    }
    else
    {
        const {idCliente} = req.query;
        const {nombre,apellido,telefono,imagen,direccion}=req.body;
        var buscarCliente = await ModeloCliente.findOne({
            where:{
                idCliente:idCliente,
            }
        });
        if(!buscarCliente)
        {
            console.log("El id que mandaron no existe");
            mensaje("Ha sucedido un error al encontrar su perfil",200, validacion.array(), res);
            //res.send("Ha sucedido un error al encontrar su perfil");
        }
        else
        {
            buscarCliente.nombre=nombre;
            buscarCliente.apellido=apellido;
            buscarCliente.telefono=telefono;
            buscarCliente.direccion=direccion;
            buscarCliente.imagen=imagen;

            await buscarCliente.save()
            .then((data)=>{
                console.log("Se actualizó \n"+data);
                //res.send("Registro actualizado");
                mensaje("Se ha modificado su perfil",200, validacion.array(), res);
            })
            .catch((error)=>{
                console.log("no se actualizó \n"+error);
                //res.send("error al actualizar los datos");
                mensaje("No se ha modificado su perfil",200, validacion.array(), res);
            })
        }
    }
};

exports.desactivarPerfil = async (req,res)=>{
    const validacion = validationResult(req);
    
    if(!validacion.isEmpty())
    {
        res.json(validacion.array());
    }
    else
    {
        const {idCliente} = req.query;
        const {estado}=req.body;

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
            buscarCliente.estado=estado;

            await buscarCliente.save()
            .then((data)=>{
                console.log("Se actualizó \n"+data);
                //una respuesta para el usuario
                res.send("Registro actualizado");
            })
            .catch((error)=>{
                console.log("no se actualizó \n"+error);
                res.send("error al actualizar los datos");
            })
        }
    }
};

exports.cambiarContra= async(req, res)=>
{
    const validacion = validationResult(req);
    
    if(!validacion.isEmpty())
    {
        res.json(validacion.array());
        mensaje("Escriba todos los campos de manera correcta",200, validacion.array(), res);
    }
    else
    {
        const {codigo,contraseña}=req.body;

        var buscarCodigo = await ModeloCliente.findOne({
            where:{
                codigo:codigo,
            }
        });
        if(!buscarCodigo)
        {
            console.log("El código que ha ingresado no es correcto");
            mensaje("El código que ha ingresado no es correcto",200, validacion.array(), res);
            //res.send("El código que ha ingresado no es correcto");
        }
        else
        {
            if(buscarCodigo.codigo!=0000)
            {
                const contraEncriptada = await bcrypt.hash(contraseña, 10);
                buscarCodigo.codigo=0000;
                buscarCodigo.contraseña=contraEncriptada;

                await buscarCodigo.save()
                .then((data)=>{
                    console.log("Se actualizó \n"+data);
                    //una respuesta para el usuario
                    mensaje("Se ha modificado la contraseña",200, validacion.array(), res);
                    //res.send("Registro actualizado");
                })
                .catch((error)=>{
                    console.log("no se actualizó \n"+error);
                    mensaje("No se ha modificado la contraseña",200, validacion.array(), res);
                    //res.send("error al actualizar los datos");
                })
            }
            else
            {
                mensaje("No es valido el código que ha ingresado",200, validacion.array(), res);
                //res.send("No es valido el código");
            }
        }
    }
}