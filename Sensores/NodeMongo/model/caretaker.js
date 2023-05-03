var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var CaretakerSchema =  new Schema({
    id: {type: Number, unique:true}, 
    name: {type: String}
})

module.exports = mongoose.model('caretaker', CaretakerSchema)
// modelo de mongoose ( nome do modelo, modelo em si )