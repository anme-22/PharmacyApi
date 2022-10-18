const {Router} = require('express');
const ControladorCliente = require('../Controlador/controladorCliente');
const ControladorLogin = require('../Controlador/controladorLogin');
const router= Router();
const {body, query}= require("express-validator");
//se hace la validación en el guardar
router.post('/verPerfil',
query('idCliente').isInt().withMessage("Debe enviar valores enteros para id persona"),
query('idCliente').notEmpty().withMessage("No debe dejar campos vacíos"),
ControladorCliente.verPerfil);

router.get('/actualizar2',
ControladorCliente.actualizar2);
module.exports=router;
router.get('/listarCliente',ControladorCliente.listarCliente);

router.post('/crearPerfil',
//body('idTipoIdentificacion').isInt().withMessage("Debe elegir un tipo de identificación"),
//body('idTipoIdentificacion').notEmpty().withMessage("No debe dejar tipo de identificación vacío"),
body('identificacion').isLength({ min: 13, max:20 }).withMessage("Debe colocar su identificación correctamente"),
body('identificacion').notEmpty().withMessage("No debe dejar el campo identificacion vacío"),
body('nombre').isAlpha().withMessage("Solo puede escribir letras en su nombre"),
body('nombre').isLength({ min: 3}).withMessage("Debe escribir su nombre completo"),
body('nombre').notEmpty().withMessage("No debe dejar el campo nombre vacío"),
body('apellido').isAlpha().withMessage("Solo puede escribir letras en su apellido"),
body('apellido').isLength({ min: 3}).withMessage("Debe escribir su apellido completo"),
body('apellido').notEmpty().withMessage("No debe dejar el campo apellido vacío"),
body('correoElectronico').isEmail().withMessage("Debe ser un correo electronico valido"),
body('correoElectronico').notEmpty().withMessage("No debe dejar el campo correo electronico vacío"),
body('contraseña').isLength({ min: 8}).withMessage("Su contraseña debe de tener al menos 8 caracteres"),
body('contraseña').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,).withMessage("La contraseña debe tener al menos una mayucula, minuscula, numero y un simbolo especial"),
body('contraseña').notEmpty().withMessage("No debe dejar el campo correo electronico vacío"),
body('numeroTelefono').isLength({ min: 8}).withMessage("Debe escribir todos los numeros de su telefono"),
body('numeroTelefono').isDecimal().withMessage("Solo debe escribir numeros"),
body('numeroTelefono').notEmpty().withMessage("No debe dejar el campo telefono vacío"),
body('direccion').notEmpty().withMessage("No debe dejar el campo direccion vacío"),
body('fechaNacimiento').isDate().withMessage("Solo puede colocar su fecha de nacimiento en este campo"),
body('fechaNacimiento').notEmpty().withMessage("No debe dejar su fecha de nacimiento vacía"),
ControladorCliente.crearPerfil);
router.put('/modificarPerfil',
query('idCliente').isInt().withMessage("Debe enviar valores enteros para id persona"),
query('idCliente').notEmpty().withMessage("No debe dejar campos vacíos"),
body('nombre').isAlpha().withMessage("Solo puede escribir letras en su nombre"),
body('nombre').isLength({ min: 3}).withMessage("Debe escribir su nombre completo"),
body('nombre').notEmpty().withMessage("No debe dejar el campo nombre vacío"),
body('apellido').isAlpha().withMessage("Solo puede escribir letras en su apellido"),
body('apellido').isLength({ min: 3}).withMessage("Debe escribir su apellido completo"),
body('apellido').notEmpty().withMessage("No debe dejar el campo apellido vacío"),
body('numeroTelefono').isLength({ min: 8}).withMessage("Debe escribir todos los numeros de su telefono"),
body('numeroTelefono').isDecimal().withMessage("Solo debe escribir numeros"),
body('numeroTelefono').notEmpty().withMessage("No debe dejar el campo telefono vacío"),
body('direccion').notEmpty().withMessage("No debe dejar el campo direccion vacío"),
ControladorCliente.modificarPerfil);
router.put('/desactivarPerfil',
query('idCliente').isInt().withMessage("Debe enviar valores enteros para id persona"),
query('idCliente').notEmpty().withMessage("No debe dejar campos vacíos"),
body('estado').isAlpha().withMessage("Solo puede escribir letras en su nombre"),
body('estado').notEmpty().withMessage("No debe dejar el campo nombre vacío"),
ControladorCliente.desactivarPerfil);
router.put('/cambiarContra',
body('contraseña').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,).withMessage("La contraseña debe tener al menos una mayucula, minuscula, numero y un simbolo especial"),
body('contraseña').notEmpty().withMessage("No debe dejar el campo correo electronico vacío"),
body('codigo').notEmpty().withMessage("No debe dejar el campo codigo vacío"),
ControladorCliente.cambiarContra);
module.exports=router;