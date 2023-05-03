var ServiceSchema = require("../model/service");

module.exports.newService = async (service_cod, service_desc) => {
    try {
        let service = new ServiceSchema({service_cod, service_desc});
        let response = await service.save();
        return {success: true, response};
    } catch(err) {
        console.log(err);
        return {success: false, response: err}
    }
}