const modeloFactura = require('../Modelo/modeloFactura');
const modeloDetalleFactura = require('../Modelo/modeloDetalleFactura');
const ModeloProducto = require('../Modelo/modeloProducto');
const mensaje = require('../componentes/mensaje');
const pool = require('../Configuracion/bd');

let arregloIdProducto = [];
let arregloCantidad = [];
let arregloPrecio = [];
let arregloNombre = [];


exports.agregarCarrito = async (req, res) => {
    const { idProducto, cantidad } = req.body;

    if (arregloIdProducto.indexOf(idProducto) !== -1) {
        console.log('El producto ya fue agregado');
        mensaje("El producto ya fue agregado", 200, arregloIdProducto, res);
        //res.send("El producto ya fue agregado");
    } else {
        const listar = await ModeloProducto.findOne(
            {
                where:
                {
                    idProducto: idProducto
                }
            });

        console.log(listar.cantidadProducto);

        if (listar.cantidadProducto <= cantidad) {
            mensaje("No se encuentra la cantidad que desea en almacen", 200, arregloIdProducto, res);
            //res.send("No se encuentra la cantidad que desea en almacen");
            console.log("Solicitó un cantidad mayor a la que hay");
        }
        else {
            arregloIdProducto.push(idProducto);
            arregloCantidad.push(cantidad);
            arregloPrecio.push(listar.precio);
            arregloNombre.push(listar.nombreProducto);
            var total = 0;

            for (var i = 0; i < arregloPrecio.length; i++) {
                total += arregloPrecio[i] * arregloCantidad[i];
            }

            console.log("Productos: " + arregloIdProducto + "\nCantidad: " + arregloCantidad + "\n Precio: " + arregloPrecio + "\n Nobmre: " + arregloNombre + "\n Total compra: " + total);
            //res.send("Productos: "+arregloIdProducto+"\nCantidad: "+arregloCantidad+"\n Precio: "+arregloPrecio+"\n Nobmre: "+arregloNombre+"\n Total compra: "+total+"\n\nEl producto ha sido almacenado");
            mensaje("El producto ha sido almacenado", 200, arregloIdProducto, res);
        }
    }
}

exports.sacarCarrito = async (req, res) => {
    const { idProducto } = req.body;

    //Obtener el id de los datos
    let indice = arregloIdProducto.indexOf(idProducto);

    //Eliminar Indice
    delete arregloIdProducto[indice];
    var filteredArr = arregloIdProducto.filter((elem) => elem !== undefined);
    arregloIdProducto = filteredArr;

    //Eliminar Cantidad
    delete arregloCantidad[indice];
    var filteredArr = arregloCantidad.filter((elem) => elem !== undefined);
    arregloCantidad = filteredArr;

    //Eliminar Precio
    delete arregloPrecio[indice];
    var filteredArr = arregloPrecio.filter((elem) => elem !== undefined);
    arregloPrecio = filteredArr;

    //Eliminar Nombre
    delete arregloNombre[indice];
    var filteredArr = arregloNombre.filter((elem) => elem !== undefined);
    arregloNombre = filteredArr;

    console.log("despues de \n\n" + "Productos: " + arregloIdProducto + "\nCantidad: " + arregloCantidad + "\n Precio: " + arregloPrecio + "\n Nobmre: " + arregloNombre);
    //res.send("Productos: "+arregloIdProducto+"\nCantidad: "+arregloCantidad+"\n Precio: "+arregloPrecio+"\n Nobmre: "+arregloNombre+"\n\nEl producto ha sido eliminado de manera correcta");
    mensaje("Productos: " + arregloIdProducto + "\nCantidad: " + arregloCantidad + "\n Precio: " + arregloPrecio + "\n Nobmre: " + arregloNombre + "\n\nEl producto ha sido eliminado de manera correcta", 200, validacion.array(), res);
}

exports.visualizarCarrito = async (req, res) => {
    objCarrito =
    {
        idProducto:arregloIdProducto,
        cantidad:arregloCantidad,
        precio:arregloPrecio,
        nombre:arregloNombre
    }

    jsonCarrito = JSON.stringify(objCarrito);

    console.log(jsonCarrito);
    res.send(jsonCarrito);
    
}

exports.realizarCompra = async (req, res) => {
    /******************Realizar Factura**********************/
    const { idEmpleado, idCliente } = req.body;
    //Obtener la fecha
    var todayDate = new Date().toISOString().slice(0, 10);
    await modeloFactura.create({
        fechaVenta: todayDate,
        idEmpleado: idEmpleado,
        idSucursal: 1,
        idCliente: idCliente,
        isv: 0.15,
        descuentoTerceraEdad: 0,
        descuento: 0
    })
        .then((data) => {
            console.log("Se hizo factura. \n" + data);
            //mensaje("Registro Almacenado", 200, arregloIdProducto.array(), res);
        })
        .catch((error) => {
            console.log(error);
            //mensaje("Error al guardar los datos", 200, arregloIdProducto.array(), res);
        })
    /******************Fin Realizar Factura************************/

    /******************Inicio Detalle Factura**********************/
    var idDeFactura = await pool.query('SELECT * FROM ultimaFactura');

    //Object.values(my_obj)
    //console.log(Object.values(idDeFactura));

    //var val;

    const propertyValues = Object.values(idDeFactura);
    const quiza = Object.values(propertyValues[1]);
    const quiza2 = Object.values(quiza[0]);
    console.log(typeof(quiza2[0]));
    console.log(quiza2[0]);

    for (var i = 0; i < arregloPrecio.length; i++) {
        await modeloDetalleFactura.create({
            idProducto: arregloIdProducto[i],
            idFactura: quiza2[0],
            cantidad: arregloCantidad[i],
            descuentoProducto: 0,
            precioProducto:arregloPrecio[i],
        })
            .then((data) => {
                console.log("Se metió dato en detalle \n"+data);
                //mensaje("Registro Almacenado", 200, arregloIdProducto.array(), res);
            })
            .catch((error) => {
                console.log("No se metió dato en detalle \n"+error);
                //mensaje("Error al guardar los datos", 200, arregloIdProducto.array(), res);
            })
    }
    /******************Fin Detalle Factura**********************/

    total = 0;

    for (var i = 0; i < arregloPrecio.length; i++) {
        total += arregloPrecio[i] * arregloCantidad[i];
    }
    impuesto = total * 0.15;

    total = total + impuesto;

    arregloIdProducto.length = 0;
    arregloCantidad.length = 0;
    arregloPrecio.length = 0;
    arregloNombre.length = 0;

    mensaje("Su compra ha sido realizada por un total de: \n" + total + " Lempiras.", 200, arregloCantidad, res);
}