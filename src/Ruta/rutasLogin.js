const {Router} = require('express');
const ControladorLogin = require('../Controlador/controladorLogin');
const router= Router();
const {body, query}= require("express-validator");
router.post('/IniciarSesion',
body('correoElectronico').notEmpty().withMessage("No debe dejar este campo vacío"),
body('contraseña').notEmpty().withMessage("No debe dejar este campo vacío"),
ControladorLogin.IniciarSesion);
router.get('/error',ControladorLogin.Error);
module.exports=router;