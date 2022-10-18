const req = require('express/lib/request');
const passport = require('passport');
const modeloCliente = require('../Modelo/modeloCliente');
const estrategiaJWT = require('passport-jwt').Strategy;
const extraerJWT = require('passport-jwt').ExtractJwt;
const JWT = require('jsonwebtoken');
const moment = require('moment');
const duracion = moment.duration(50, "m").asSeconds();
const clave = process.env.contrasenaPassport;
//Genera token
exports.generarToken=(data)=>{
    return JWT.sign(data,clave,{expiresIn:duracion});
}
const opc={};
opc.jwtFromRequest = extraerJWT.fromAuthHeaderAsBearerToken();
opc.secretOrKey=clave;

passport.use( new estrategiaJWT(opc, async (payload,done)=>{
    return await modeloCliente.findOne({
        where:{
            idCliente: payload.id
        }
    })
    .then((data)=>{
        return done(null,data.id);
    })
    .catch((error)=>{
        return done(null,false);
    });
}));
exports.ValidarAutenticacion=passport.authenticate('jwt',{session:false, failureRedirect: '/api/autenticacion/error/'});