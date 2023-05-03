let RegistoModel = require('../model/Registo');

module.exports.new = async (num_seq, data_registo, temperatura, falta_ar, dor_cabeca, dor_muscular, tosse, diarreia, olfato_paladar, avaliacao_global) => {
    if(!data_registo) {
        data_registo = num_seq[1]
        temperatura = num_seq[2]
        falta_ar = num_seq[3]
        dor_cabeca = num_seq[4]
        dor_muscular = num_seq[5]
        tosse = num_seq[6]
        diarreia = num_seq[7]
        olfato_paladar = num_seq[8]
        avaliacao_global = num_seq[9]
        num_seq = num_seq[0]
    }

    try {
        let Registo = new RegistoModel({num_seq, data_registo, temperatura, falta_ar, dor_cabeca, dor_muscular, tosse, diarreia, olfato_paladar, avaliacao_global});
        let response = await Registo.save();
        return {success: true, response};
    } catch(err) {
        console.log(err);
        return {success: false, response: err}
    }
}

