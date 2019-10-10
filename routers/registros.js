var express = require("express");
var session = require("express-session");
var router = express.Router();
var usuario = require("../models/usuario");


//Peticion para guardar un nuevo USUARIO
router.post("/", function(req, res){
   
    var p = new usuario({
            nombreCompleto: req.body.nombreCompleto,
            correo: req.body.correo,
            contrasena:req.body.contrasena,
            genero: req.body.genero,
            tipoUsuario: "normal"
    });


    p.save()
    .then(obj=>{
        res.send({status:1,mensaje:"Usuario registrado con éxito",obj});
        
    })
    .catch(error=>{
        res.send({status:0,mensaje:"Usuario no registrado",obj});
    });

});


//Peticion para actualizar un registro
router.put("/:id",function(req,res){
    usuario.update(
        {_id:req.params.id},
        {
            nombreCompleto: req.body.nombreCompleto,
            correo: req.body.correo,
            contraseña:req.body.contraseña,
            genero: req.body.genero,
            tipoUsuario: "normal"
            
        }
    ).then(result=>{
        res.send(result);
    })
    .catch(error=>{
        res.send(error);
    });//El primero son los filtros, el segundo son los campos
});



module.exports = router;