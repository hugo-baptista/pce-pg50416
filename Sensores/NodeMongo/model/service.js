var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var ServiceSchema =  new Schema({
    service_cod: {type: String, unique: true}, 
    service_desc: {type: String}
})

module.exports = mongoose.model('service', ServiceSchema)
// modelo de mongoose ( nome do modelo, modelo em si )