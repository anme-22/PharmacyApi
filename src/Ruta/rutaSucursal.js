const {Router}= require('express');
const ControladorSucursal = require('../Controlador/controladorSucursal');
const router = Router();
const {body,query}= require("express-validator");
router.get('/verSucursal', ControladorSucursal.verSucursal);
module.exports=router;