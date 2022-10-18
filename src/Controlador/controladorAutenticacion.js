const enviarCorreo = require('../Configuracion/correo');
const modeloCliente= require('../Modelo/modeloCliente');
const{validationResult}=require('express-validator');
const passport = require('../componentes/mensaje');
const mensaje = require('../componentes/mensaje');

exports.cambiarContrasena = async (req,res)=>{
    const validacion = validationResult(req);
    if(!validacion.isEmpty())
    {
        mensaje("Observe si colocó los datos de manera correcta",200, res.json(validacion.array()), res);
    }
    else
    {
        const {correoElectronico} = req.body;
        var buscarCorreo = await modeloCliente.findOne({
            where:{
                correoElectronico:correoElectronico
            }
        });
        const pin = Math.floor(Math.random()*(9999-1000))+1000;
        if(buscarCorreo)
        {
            const data = {
                correoElectronico:correoElectronico,
                pin:pin,
            }
            enviarCorreo.recuperarContrasena(data);
            //res.send("Se ha enviado el correo electronico de manera correcta");
            mensaje("Se ha enviado el correo electronico de manera correcta",200,validacion.array(), res);

                buscarCorreo.codigo=pin;

                await buscarCorreo.save()
                .then((data)=>{
                    console.log("Se actualizó \n"+data);
                    //una respuesta para el usuario
                    //res.send("Registro actualizado");
                })
                .catch((error)=>{
                    console.log("no se actualizó \n"+error);
                    //res.send("error al actualizar los datos");
                })
        }
        else
        {
            console.log("No se encontró el correo en la bd");
            mensaje("El correo electronico no pertenece a ningún usuario",200, validacion.array(), res);
            //res.send("Error al enviar el correo electronico");
        }
    }
};