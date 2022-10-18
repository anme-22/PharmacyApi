const {Router} = require('express');
const ControladorProducto = require('../Controlador/controladorProducto');
const router= Router();
const {body, query}= require("express-validator");
router.get('/verProductos',ControladorProducto.verProductos);
router.get('/verProducto',
query('idProducto').isInt().withMessage("Debe enviar valores enteros para id producto"),
query('idProducto').notEmpty().withMessage("No debe dejar campos vacíos"),
ControladorProducto.verProducto);
router.post('/crearProducto',ControladorProducto.crearProducto);
router.put('/modificarProducto',ControladorProducto.modificarProducto);
router.delete('/eliminar',ControladorProducto.eliminar);
module.exports=router;