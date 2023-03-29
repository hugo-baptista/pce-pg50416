let SensorSchema = require('../model/sensor');

module.exports.newSensor = async (sensor_id, sensor_num, type) => {
    try {
        let sensor = new SensorSchema({sensor_id, sensor_num , type_of_sensor: type});
        let response = await sensor.save();
        return {success: true, response};
    } catch(err) {
        console.log(err);
        return {success: false, response: err}
    }
}
