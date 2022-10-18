const {Router} = require('express');
const controladorCarrito = require('../Controlador/controladorCarrito');
const router= Router();

router.post('/agregarCarrito', controladorCarrito.agregarCarrito);
router.put('/sacarCarrito', controladorCarrito.sacarCarrito);
router.get('/visualizarCarrito', controladorCarrito.visualizarCarrito);
router.post('/realizarCompra', controladorCarrito.realizarCompra);

module.exports=router;

