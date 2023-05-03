const fs = require('fs');
const CodigoPostalController = require('./CodigoPostal')
const DoenteController = require('./Doente')
const RegistoController = require('./Registo')

// Controladores Aqui

module.exports.readFile = async () => {
    console.log("Start import");

    const filePath = 'C:\\Google Drive\\Universidade\\4º Ano\\ApInf-PCE\\PCE\\RegistosCovid\\content\\';
    const filenames_controllers = [['cod_postal.csv', CodigoPostalController], 
    ['doentes.csv', DoenteController], ['registos_covid19.csv', RegistoController]];
    
    for(let [name, controller] of filenames_controllers) {
        console.log("Start "+name);
        const fileRead = fs.readFileSync(filePath+name);
        let lines = fileRead.toString().split('\n');
        lines = lines.slice(1);
        for(let line of lines) {
            let lineParams = line.split(';');
            if(lineParams[lineParams.length-1].includes('\r')) {
                lineParams[lineParams.length-1] = lineParams[lineParams.length-1].slice(0,-1)
            }

            // console.log(lineParams);
            if(name=='registos_covid19.csv' && lineParams[2]) {
                // if(lineParams[2].includes("ºC")) {
                //     lineParams[2] = lineParams[2].slice(0,-3)
                // } else if(lineParams[2].includes("Cel")) {
                //     lineParams[2] = lineParams[2].slice(0,-4)
                // } else if(lineParams[2].includes("[degF]")) {
                //     lineParams[2] = lineParams[2].slice(0,-7)
                // }
                lineParams[2] = lineParams[2].replace(/\s/g, '')
            }

            await controller.new(lineParams)
        }
    }

    console.log("End import");
}