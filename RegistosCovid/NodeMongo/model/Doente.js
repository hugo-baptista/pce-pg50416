var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var CodigoPostalSchema =  new Schema({
    codigo_postal: {type: Number, unique:true},
    localidade: {type: String}
})

module.exports = mongoose.model('CodigoPostal', CodigoPostalSchema)

var RegistoSchema =  new Schema({
    num_seq: {type: Number},
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

var DoenteSchema =  new Schema({
    id_paciente: {type: Number, unique:true},
    nome: {type: String},
    data_nascimento: {type: String},
    genero: {type: String},
    codigo_postal: {type: Number},
    registos: [RegistoSchema]
})

module.exports = mongoose.model('Doente', DoenteSchema)