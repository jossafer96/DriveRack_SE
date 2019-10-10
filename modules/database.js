var mongoose = require('mongoose');
var servidor = 'localhost:27017';
var db = 'driveRack';

class Database{
    constructor(){
        
        mongoose.connect(`mongodb://${servidor}/${db}`,{ useNewUrlParser: true })
        .then(()=>{
            console.log('Se conecto a Mongo');
        }).catch((error)=>{
            console.log(error);
        });
    }
}

module.exports = new Database();