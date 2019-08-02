var express = require ("express");
	// Crear una aplicación de nodejs con express
	var app = express ();

	// definir una carpeta como publicación para que los usuarios puedan acceder a su contenido
	app.use (express.static ("public"));
	 
	// Levantar el servidor en el puerto 3333
	app.listen (3333, function () {
	    console.log ("Servidor levantado en el puerto 3333");
	});