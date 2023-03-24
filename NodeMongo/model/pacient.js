var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var PacientSchema =  new Schema({
    pacientid: {type: Number, unique: true}, 
    pacientname: {type: String},
    pacientbirthdate: {type: Date},
    pacientAge: {type: Number}
})

module.exports = mongoose.model('pacient', PacientSchema)
// modelo de mongoose ( nome do modelo, modelo em si )