let SensorSchema = require('../model/sensor');

module.exports.newSensor = async (sensor_id, sensor_num, type_of_sensor) => {
    try {
        let sensor = new SensorSchema({sensor_id, sensor_num , type_of_sensor});
        let response = await sensor.save();
        return {success: true, response};
    } catch(err) {
        console.log(err);
        return {success: false, response: err}
    }
}

module.exports.updateSensor = async (id, num, type) => {
    try {
        if (num && type) {
            var response = await SensorSchema.updateOne({sensor_id:id},{
                $set:{
                    sensor_num: num,
                    type_of_sensor: type
                }
            });
        } else if (num) {
            var response = await SensorSchema.updateOne({sensor_id:id},{
                $set:{
                    sensor_num: num
                }
            });
        } else {
            var response = await SensorSchema.updateOne({sensor_id:id},{
                $set:{
                    type_of_sensor: type
                }
            });
        }
        return {success: true, response};
    } catch(err) {
        console.log(err);
        return {success: false, response: err};
    }
}

module.exports.removeSensor = async (sensor_id) => {
    try {
        const response = await SensorSchema.deleteOne({sensor_id})
        return { success: true, response };
    } catch (err) {
        console.log(err);
        return { success: false, response: err };
    }
};
