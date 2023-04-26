let CodigoPostalModel = require('../model/CodigoPostal');

module.exports.newCodigoPostal = async (codigo_postal, localidade) => {
    if(!localidade) {
        localidade = codigo_postal[1]
        codigo_postal = codigo_postal[0]
    }

    try {
        let CodigoPostal = new CodigoPostalModel({codigo_postal, localidade});
        let response = await CodigoPostal.save();
        return {success: true, response};
    } catch(err) {
        console.log(err);
        return {success: false, response: err}
    }
}

