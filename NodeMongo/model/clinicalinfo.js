var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var BloodPressSchema =  new Schema({
    systolic: {type: Number}, 
    diastolic: {type: Number}
})

var ClinicalInfoSchema =  new Schema({
    clinicalinfoid: {type: Number, unique: true},
    amddate: {type: Date}, 
    bed: {type: String},
    bodytemp: {type: Number},
    bloodpress: {type: BloodPressSchema},
    bpm: {type: Number},
    sato2: {tupe: Number},
    timestamp: {type: Date}
})

module.exports = mongoose.model('clinicalinfo', ClinicalInfoSchema)
// modelo de mongoose ( nome do modelo, modelo em si )