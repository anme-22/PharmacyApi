const {Router} = require('express');
const controladorContraseña = require('../Controlador/controladorAutenticacion');
const {body, query}= require("express-validator");
const router= Router();
router.post('/cambiarContrasena',
body('correoElectronico').notEmpty().withMessage("No debe dejar este campo vacío"),
controladorContraseña.cambiarContrasena);
module.exports=router;