let PacientSchema = require('../model/pacient');

module.exports.newPacient = async (pacient_id, pacient_name, pacient_birth_date, pacient_age) => {
    try {
        let pacient = new PacientSchema({pacient_id, pacient_name, pacient_birth_date, pacient_age});
        let response = await pacient.save();
        return {success: true, response};
    } catch(err) {
        console.log(err);
        return {success: false, response: err}
    }
}
