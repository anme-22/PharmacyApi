const mensaje = (msj,estado,data,res)=>
{
    var mensaje={
        msj:msj,
        data:data
    }
    res.setHeader("Content-Type","application/jspn");
    res.satuCode=estado;
    res.json(mensaje);
}
module.exports=mensaje;