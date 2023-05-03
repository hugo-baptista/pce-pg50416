var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var CodigoPostalSchema =  new Schema({
    codigo_postal: {type: Number, unique:true},
    localidade: {type: String}
})

module.exports = mongoose.model('CodigoPostal', CodigoPostalSchema)
// modelo de mongoose ( nome do modelo, modelo em si )