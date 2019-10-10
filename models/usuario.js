var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
        nombreCompleto : String,
        correo:String,
        contrasena:String,
        genero:String,
        tipoUsuario:String,
        perfilImg:String
    }
);

module.exports = mongoose.model('usuarios',esquema);