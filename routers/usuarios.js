var express = require("express");
var session = require("express-session");
var router = express.Router();
var usuario = require("../models/usuario");
const jwt = require('jsonwebtoken');


router.get('/logout',function(req,res){
    req.session.destroy();
    res.redirect("/login.html");
});

router.post('/authenticate', (req, res) => {7
    usuario.findOne({
      correo: req.body.correo
    }, (err, user) => {
      if(err) throw err;
  
      if (!user) {
        res.json({success: true, message:'authentication failed. User not found'});
      }
  
      else if (user){
        if (user.contrasena != req.body.contrasena) {
          res.json({ success: false, message: 'authentication failed. Wrong password'});
        } else {
          const token = jwt.sign({user}, req.app.get('superSecret'));
          res.setHeader('x-access-token',token)
          req.session.token =  token;
          req.session.user =  user._id;
          res.json({
            success: true,
            message: 'Enjoy your token',
            token: token,
            user:req.session.user
          });
        }
      }
    });
  });

  router.use((req, res, next) => {
    // x-access-token: token , /api?token=token, form body
    var token = req.body.token || req.query.token || req.headers['x-access-token']||  req.session.token;
  
    if (token) {
      jwt.verify(token, req.app.get('superSecret'), (err, decoded) => {
        if (err) {
          return res.json({
            success: false,
            message: 'Failed to authenticate token'
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'No  token provided'
      });
    }
  });

//Obtener el listado de todos los USUARIOS
router.get("/",function(req,res){
  
    usuario.find({_id:req.session.user})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
  
});

//Obtener un USUARIO en particular
router.get("/:id",function(req,res){
    usuario.find({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});


//Peticion para eliminar un registro
router.delete("/:id",function(req, res){
    usuario.remove({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
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
            perfilImg:req.body.perfilImg,
            tipoUsuario: "normal"
            
        }
    ).then(result=>{
        res.send(result);
    })
    .catch(error=>{
        res.send(error);
    });//El primero son los filtros, el segundo son los campos
});

//Peticion para cerrar sesion


//La siguiente es una peticion restringida, se envia una funcion midleware que verifica si esta autenticadoo no.
/*router.get("/peticion-registringido",verificarAutenticacion,function(req, res){
    res.send("Este es un contenido restringido");
    res.end();
});

///Para agregar seguridad a una ruta especifica, esta función sería llamada desde alguna peticion.
function verificarAutenticacion(req, res, next){
	if(req.session.correoUsuario)
		return next();
	else
		res.send("ERROR, ACCESO NO AUTORIZADO");
}

//Peticion para abrir sesion
router.post("/logear",function(req, res){
   
    usuario.find({correo:req.body.correo, contrasena:req.body.contrasena})
    .then(data=>{
        if (data.length==1){
           
            //Significa que si encontro un usuario con las credenciales indicadas
            //Establecer las variables de sesion
            req.session.codigoUsuario = data[0]._id;
            req.session.nombreUsuario = data[0].nombreCompleto;
            req.session.correoUsuario =  data[0].correo;
            res.send({status:1,mensaje:"Usuario autenticado con éxito",usuario:data[0]});
        }else{
            res.send({status:0,mensaje:"Credenciales inválidas"});
        }
        
    })
    .catch(error=>{
        res.send(error);
    }); 
   
});
*/



module.exports = router;