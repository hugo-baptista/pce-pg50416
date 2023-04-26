const fs = require('fs');
const CodigoPostalController = require('./CodigoPostal')
// const CodigoPostalController = require('./')
// const CodigoPostalController = require('./CodigoPostal')

// Controladores Aqui

module.exports.readFile = async () => {
    const filePath = 'C:\\Google Drive\\Universidade\\4º Ano\\ApInf-PCE\\PCE\\RegistosCovid\\content\\';
    // const filenames = ['cod_postal.csv', 'doentes.csv', 'registos_covid19.csv'];
    // const controllers = [CodigoPostalController]
    const filenames = ['cod_postal.csv'];

    for(let name of filenames) {
        const fileRead = fs.readFileSync(filePath+name);
        let lines = fileRead.toString().split('\n');
        for(let line of lines) {
            let lineParams = line.split(';');
            if(lineParams[lineParams.length-1].includes('\r')) {
                lineParams[lineParams.length-1] = lineParams[lineParams.length-1].slice(0,-1)
            }

            console.log(lineParams);
            let newCodigoPostal = await CodigoPostalController.newCodigoPostal(lineParams)
            if (newCodigoPostal.success) {
                console.log("Sucesso");
            } else {
                console.log("Insucesso");
            }
        }
    }
}