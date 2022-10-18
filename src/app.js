const express = require("express");
const { json } = require("express/lib/response");
const morgan = require("morgan");
const path = require('path')
require('dotenv').config();

const app = express();
app.use(morgan('medik'));
app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.set('json spaces', 2);
app.use('./usuario/img/', express.static(path.join(__dirname,'public/img')));
app.use('/api/Empleado',require('./Ruta/rutaEmpleado'));
app.use('/api/Login',require('./Ruta/rutasLogin'));
app.use('/api/Contrasena',require('./Ruta/rutaCorreo'));
app.use('/api/archivos',require('./Ruta/rutaArchivo'));
app.use('/api/Producto',require('./Ruta/rutaProducto'));
app.use('/api/Sucursal',require('./Ruta/rutaSucursalAdmin'));
app.use('/api/Servicios',require('./Ruta/rutaServicios'));
app.use('/api/Facturacion',require('./Ruta/rutaFacturacion'));
app.use('/api/Clientes', require('./Ruta/rutaClienteAdmin'));
app.listen(4001, ()=>{
    console.log("Servidor iniciado en el puerto 4001 🧑‍⚕️👩‍⚕️🏥")
});