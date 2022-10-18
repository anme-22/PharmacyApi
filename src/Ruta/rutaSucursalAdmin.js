const {Router} = require('express');
const ControladorSucursal = require('../Controlador/controladorSucursalAdmin');
const router= Router();
const {body, query}= require("express-validator");
router.get('/listarUnSucursal',ControladorSucursal.listarUnSucursal);
router.get('/listarSucursal',ControladorSucursal.listarSucursal);
router.post('/crearSucursal',
body('nombreSucursal').notEmpty().withMessage("No debe dejar el campo nombre sucursal vacío"),
body('direccion').notEmpty().withMessage("No debe dejar el campo direccion vacío"),
ControladorSucursal.crearSucursal);
router.put('/modificarSucursal',
body('nombreSucursal').notEmpty().withMessage("No debe dejar el campo nombre sucursal vacío"),
body('direccion').notEmpty().withMessage("No debe dejar el campo direccion vacío"),
ControladorSucursal.modificarSucursal);
router.delete('/eliminar',ControladorSucursal.eliminar);
module.exports=router;