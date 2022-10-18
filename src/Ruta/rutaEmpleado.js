const {Router} = require('express');
const ControladorEmpleado = require('../Controlador/controladorEmpleado');
const router= Router();
const {body, query}= require("express-validator");
router.get('/listarUnEmpleado',ControladorEmpleado.listarUnEmpleado);
router.get('/listarEmpleado',ControladorEmpleado.listarEmpleado);
router.post('/crearEmpleado',
body('numeroIdentidad').isLength({ min: 13, max:20 }).withMessage("Debe colocar su identificación correctamente"),
body('numeroIdentidad').notEmpty().withMessage("No debe dejar el campo identificacion vacío"),
body('nombreEmpleado').isAlpha().withMessage("Solo puede escribir letras en su nombre"),
body('nombreEmpleado').isLength({ min: 3}).withMessage("Debe escribir su nombre completo"),
body('nombreEmpleado').notEmpty().withMessage("No debe dejar el campo nombre vacío"),
body('apellidoEmpleado').isLength({ min: 3}).withMessage("Debe escribir su apellido completo"),
body('apellidoEmpleado').notEmpty().withMessage("No debe dejar el campo apellido vacío"),
body('correoElectronico').isEmail().withMessage("Debe ser un correo electronico valido"),
body('correoElectronico').notEmpty().withMessage("No debe dejar el campo correo electronico vacío"),
body('contraseña').isLength({ min: 8}).withMessage("Su contraseña debe de tener al menos 8 caracteres"),
body('contraseña').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,).withMessage("La contraseña debe tener al menos una mayucula, minuscula, numero y un simbolo especial"),
body('contraseña').notEmpty().withMessage("No debe dejar el campo correo electronico vacío"),
body('numeroTelefono').isLength({ min: 8}).withMessage("Debe escribir todos los numeros de su telefono"),
body('numeroTelefono').isDecimal().withMessage("Solo debe escribir numeros"),
body('numeroTelefono').notEmpty().withMessage("No debe dejar el campo telefono vacío"),
body('direccion').notEmpty().withMessage("No debe dejar el campo direccion vacío"),
ControladorEmpleado.crearEmpleado);
router.put('/modificarEmpleado',
body('nombreEmpleado').isAlpha().withMessage("Solo puede escribir letras en su nombre"),
body('nombreEmpleado').isLength({ min: 3}).withMessage("Debe escribir su nombre completo"),
body('nombreEmpleado').notEmpty().withMessage("No debe dejar el campo nombre vacío"),
body('apellidoEmpleado').isLength({ min: 3}).withMessage("Debe escribir su apellido completo"),
body('apellidoEmpleado').notEmpty().withMessage("No debe dejar el campo apellido vacío"),
body('numeroTelefono').isLength({ min: 8}).withMessage("Debe escribir todos los numeros de su telefono"),
body('numeroTelefono').isDecimal().withMessage("Solo debe escribir numeros"),
body('numeroTelefono').notEmpty().withMessage("No debe dejar el campo telefono vacío"),
body('direccion').notEmpty().withMessage("No debe dejar el campo direccion vacío"),
ControladorEmpleado.modificarEmpleado);
router.delete('/eliminar',ControladorEmpleado.eliminar);
module.exports=router;