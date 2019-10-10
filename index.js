var express = require ("express");
var session = require("express-session");
var database = require('./modules/database');
var usuario = require("./models/usuario");
var usuariosRouter = require('./routers/usuarios');
var registrosRouter = require('./routers/registros');
var contenidosRouter = require('./routers/contenido');
const config = require('./config');
var bodyParser = require("body-parser");
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
var path = require('path');
var multer = require('multer');


let storage = multer.diskStorage({
	destination:(req, file, cb)=> {
		cb(null,'./public/assets/img/upload')
	},
	filename:(req,file,cb) => {
		cb(null, file.fieldname+ '-'+ Date.now()+ path.extname(file.originalname));
	}
});

const upload = multer({storage});




	// Crear una aplicación de nodejs con express
	var app = express ();
	app.use(session({secret:"ASDFE$%#%",resave:false, saveUninitialized:true}));
	app.set('port', process.env.PORT || 3000);
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use("/login",usuariosRouter);
	app.use("/registro",registrosRouter);
	app.use("/dashboard",contenidosRouter);
	
	// definir una carpeta como publicación para que los usuarios puedan acceder a su contenido
	app.use (express.static ("public"));
	app.set('superSecret', config.secret); // secret variable
	app.use(morgan('dev'));
	 
	app.post('/subir',upload.single('file'), (req, res)=> {
		console.log(`storage location is  ${req.hostname}/${req.file.path} `);
		return res.send(req.file);
	})
	// Levantar el servidor en el puerto 3333
	app.listen (app.get('port'), function () {
	    console.log ("Servidor levantado en el puerto 3333");
	});
