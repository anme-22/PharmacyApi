const ModeloEmpleado = require('../Modelo/modeloEmpleado');
const bcrypt = require('bcrypt');
const{validationResult}=require('express-validator');
const passport = require('../Configuracion/passport');
const mensaje = require('../componentes/mensaje');

exports.ValidarAutenticado=passport.ValidarAutenticado;
exports.IniciarSesion = async (req,res)=>{
    const validacion = validationResult(req);
    if(!validacion.isEmpty())
    {
        res.json(validacion.array())
    }
    else
    {
        const {correoElectronico,contraseña} =req.body;

        const buscarEmpleado = await ModeloEmpleado.findOne({
            where:
            {
                correoElectronico:correoElectronico
            }
        });

        if(!buscarEmpleado)
        {
            console.log("Ha ingresado el usuario incorrecta");
            mensaje("Ha ingresado el usuario o contraseña incorrecta",200, validacion.array(), res);
        }
        else
        {        
                if(await bcrypt.compare(contraseña, buscarEmpleado.contraseña))
                {
                    const Token = passport.generarToken({correoElectronico:correoElectronico});
                    const data={
                        token:Token,
                        data: buscarEmpleado.idEmpleados
                    };
                    mensaje(buscarEmpleado.idEmpleados,200, data, res);
                    console.log("Ha iniciado sesión");
                }
                else
                {
                    console.log("Ha ingresado la contraseña incorrecta");
                    mensaje("Ha ingresado su usuario o contraseña incorrecta",200, validacion.array(), res);
                }
        }
    }
};
exports.Error = (req,res)=>
{
    mensaje("Debe estar autenticado", 200, [], res);
};