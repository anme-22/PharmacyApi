const { verify } = require('jsonwebtoken');
const nodemailer = require('nodemailer');
exports.recuperarContrasena = async (data) => {
    const configuracionCorreo = {
        from: process.env.correoElectronico,
        to: data.correoElectronico,
        subject:"Recuperar contraseña",
        text:"Pin: "+data.pin,
    };
    const transport = nodemailer.createTransport({
        host:process.env.correoServicio,
        port:process.env.correo_port,
        secure:true,
        service: 'gmail',
        auth:
        {
            user: process.env.correoElectronico,
            pass: process.env.contrasenaCorreo
        }
    });
    await transport.verify(async function(error, succes){
        if(error)
        {
            console.log("Error");
            return false;
        }
        else
        {
            console.log("El servidor puede enviar el correo");
            return true;
        }
    });
    return await transport.sendMail(configuracionCorreo);
}