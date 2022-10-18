const{ Router } = require('express');
const path = require('path'); 
const multer = require('multer'); 
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.join(__dirname,'../public/img'))
    },
    filename: function (req,file, cb){
        const uniqueSuffix= Date.now() + '-' + Math.round(Math.random()*1E9)
        cb(null,file.fieldname + '-' + uniqueSuffix + file.mimetype.replace("/","."))
    }
});
const upload = multer({ storage: storage });
const ControladorArchivos = require('../Controlador/ControladorArchivos'); 

const router = Router();
router.post('/img',upload.single('img'),ControladorArchivos.Recibir);
module.exports=router;