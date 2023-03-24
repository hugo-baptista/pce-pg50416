var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var PacientSchema =  new Schema({
    pacient_id: {type: Number, unique: true}, 
    pacient_name: {type: String},
    pacient_birth_date: {type: Date},
    pacient_age: {type: Number}
})

module.exports = mongoose.model('pacient', PacientSchema)
// modelo de mongoose ( nome do modelo, modelo em si )