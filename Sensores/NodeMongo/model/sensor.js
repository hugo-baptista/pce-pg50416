var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var SensorSchema =  new Schema({
    sensor_id: {type:Number, unique:true}, 
    sensor_num: {type: Number, unique:true},
    type_of_sensor: {type: String}
})

module.exports = mongoose.model('sensor', SensorSchema)
// modelo de mongoose ( nome do modelo, modelo em si )