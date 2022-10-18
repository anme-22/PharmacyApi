const {Router} = require('express');
const ControladorServicios = require('../Controlador/controladorServicios');
const router= Router();
const {body, query}= require("express-validator");
router.get('/listarUnServicios',ControladorServicios.listarUnServicios);
router.get('/listarServicios',ControladorServicios.listarServicios);
router.post('/crearServicios',
body('nombreServicio').notEmpty().withMessage("No debe dejar el campo nombre servicio vacío"),
ControladorServicios.crearServicios);
router.put('/modificarServicios',
body('nombreServicio').notEmpty().withMessage("No debe dejar el campo nombre servicio vacío"),
ControladorServicios.modificarServicios);
router.delete('/eliminar',ControladorServicios.eliminar);
module.exports=router;