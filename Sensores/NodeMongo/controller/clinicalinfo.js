const { model } = require('mongoose');
let ClinicalInfoSchema = require('../model/clinicalinfo');

module.exports.newClinicalInfo = async (clinicalinfo_id, adm_date, bed, body_temp, systolic, diastolic, bpm, sato2, timestamp) => {
    try {
        let blood_press = {systolic, diastolic};
        let clinicalinfo = new ClinicalInfoSchema({clinicalinfo_id, adm_date, bed, body_temp, blood_press, bpm, sato2, timestamp});
        let response = await clinicalinfo.save();
        return {success: true, response};
    } catch(err) {
        console.log(err);
        return {success: false, response: err}
    }
}

module.exports.newClinicalInfoAlternative = async (ClinicalInformation, BloodPressReading) => {
    try {
        let clinicalinfo = new ClinicalInfoSchema({
            clinicalinfo_id: ClinicalInformation.clinicalinfo_id,
            amd_date: ClinicalInformation.amd_date,
            bed: ClinicalInformation.bed,
            body_temp: ClinicalInformation.body_temp,
            blood_press: BloodPressReading,
            bpm: ClinicalInformation.bpm,
            sato2: ClinicalInformation.sato2,
            timestamp: ClinicalInformation.timestamp
        });
        let response = await clinicalinfo.save();
        return {success: true, response};
    } catch(err) {
        console.log(err);
        return {success: false, response: err}
    }
}