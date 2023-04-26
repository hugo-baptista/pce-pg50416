let DoenteModel = require('../model/Doente');

module.exports.new = async (id_paciente, nome, data_nascimento, genero, codigo_postal) => {
    if(!nome) {
        nome = id_paciente[4]
        data_nascimento = id_paciente[1]
        genero = id_paciente[2]
        codigo_postal = id_paciente[0]
        id_paciente = id_paciente[3]
    }

    try {
        let Doente = new DoenteModel({id_paciente, nome, data_nascimento, genero, codigo_postal});
        let response = await Doente.save();
        return {success: true, response};
    } catch(err) {
        console.log(err);
        return {success: false, response: err}
    }
}

