let SensorSchema = require('../model/sensor');

module.exports.newSensor = async (sensorid, sensornum, type) => {
    try {
        let sensor = new SensorSchema({sensorid, sensornum, type_of_sensor: type});
        let response = await sensor.save();
        return {success: true, response};
    } catch(err) {
        console.log(err);
        return {success: false, response: err}
    }
}
