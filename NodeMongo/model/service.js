var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var ServiceSchema =  new Schema({
    servicecod: {type: String, unique: true}, 
    servicedesc: {type: String}
})

module.exports = mongoose.model('service', ServiceSchema)
// modelo de mongoose ( nome do modelo, modelo em si )