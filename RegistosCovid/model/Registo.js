var mongoose=require('mongoose');
var Doente=require('./Doente');
var Schema = mongoose.Schema;

var RegistoSchema =  new Schema({
    num_seq: {type: Schema.Types.ObjectId, ref: 'Doente'},
    data_registo: {type: String},
    temperatura: {type: Number},
    falta_ar: {type: String},
    dor_cabeca: {type: String},
    dor_muscular: {type: String},
    tosse: {type: String},
    diarreia: {type: String},
    olfato_paladar: {type: String},
    avaliacao_global: {type: String}
})

module.exports = mongoose.model('Registo', RegistoSchema)
// modelo de mongoose ( nome do modelo, modelo em si )