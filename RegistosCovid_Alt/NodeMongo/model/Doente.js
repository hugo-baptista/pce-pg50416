var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var DoenteSchema =  new Schema({
    id_paciente: {type: Number, unique:true},
    nome: {type: String},
    data_nascimento: {type: String},
    genero: {type: String},
    codigo_postal: {type: Number}
})

module.exports = mongoose.model('Doente', DoenteSchema)
// modelo de mongoose ( nome do modelo, modelo em si )