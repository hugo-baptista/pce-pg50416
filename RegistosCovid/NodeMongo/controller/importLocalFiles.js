const fs = require('fs');
const CodigoPostalController = require('./CodigoPostal')
const DoenteController = require('./Doente')
const RegistoController = require('./Registo')

// Controladores Aqui

module.exports.readFile = async () => {
    const filePath = 'C:\\Google Drive\\Universidade\\4º Ano\\ApInf-PCE\\PCE\\RegistosCovid\\content\\';
    const filenames_controllers = [['cod_postal.csv', CodigoPostalController], 
    ['doentes.csv', DoenteController], ['registos_covid19.csv', RegistoController]];
    
    const registos_file_controller = ['registos_covid19.csv', RegistoController];
    lines = 
    for(let [name, controller] of filenames_controllers) {
        const fileRead = fs.readFileSync(filePath+name);
        let lines = fileRead.toString().split('\n');
        lines = lines.slice(1);
        for(let line of lines) {
            let lineParams = line.split(';');
            if(lineParams[lineParams.length-1].includes('\r')) {
                lineParams[lineParams.length-1] = lineParams[lineParams.length-1].slice(0,-1)
            }


            await controller.new(lineParams)
        }
    }


    doentes.map(x => {
        x.registos = registos.filter(y => y.numseq == x.id_paciente);
        return x;
    })

    console.log(doentes);
}