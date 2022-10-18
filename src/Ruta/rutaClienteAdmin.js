const {Router} = require('express');
const ControladorClienteAdmin = require('../Controlador/controladorClienteAdmin');
const router= Router();
const {body, query}= require("express-validator");
router.get('/listarUnCliente',ControladorClienteAdmin.listarUnCliente);
router.get('/listarCliente',ControladorClienteAdmin.listarCliente);
router.post('/crearCliente',
body('identificacion').notEmpty().withMessage("No debe dejar el campo nombre identificacion vacío"),
body('nombre').notEmpty().withMessage("No debe dejar el campo nombre vacío"),
body('apellido').notEmpty().withMessage("No debe dejar el campo nombre apellido vacío"),
body('numeroTelefono').notEmpty().withMessage("No debe dejar el campo nombre telefono vacío"),
body('direccion').notEmpty().withMessage("No debe dejar el campo direccion vacío"),
ControladorClienteAdmin.crearCliente);
router.put('/modificarCliente',
body('identificacion').notEmpty().withMessage("No debe dejar el campo nombre identificacion vacío"),
body('nombre').notEmpty().withMessage("No debe dejar el campo nombre  vacío"),
body('apellido').notEmpty().withMessage("No debe dejar el campo nombre apellido vacío"),
body('numeroTelefono').notEmpty().withMessage("No debe dejar el campo nombre Telefono vacío"),
body('direccion').notEmpty().withMessage("No debe dejar el campo direccion vacío"),
ControladorClienteAdmin.modificarCliente);
router.delete('/eliminar',ControladorClienteAdmin.eliminar);
module.exports=router;