var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
        titulo: String,
        plantilla:String,
        url:String,
        idUsuario:String,
        descripcion:String,
        visitas:String,
        contenido:{
            contenidoPrincipal:String,
                contenidoImg:String,
                contenidoTitulo:String,
                contenidoTexto:String
        },
        html:String,
        favicon:String
    }
);

module.exports = mongoose.model('contenido',esquema);