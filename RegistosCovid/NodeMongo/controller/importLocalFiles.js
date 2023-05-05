const fs = require('fs');
const DoenteController = require('./Doente')

function normalizeTemp(temp){
    return parseFloat(temp.split(" ")[0]);
}

function normalizaVazios(valor) {
    return(valor === '' || !valor) ? 0 : valor;
    // if null then 0 else valor
}

module.exports.readFile = async () => {
    const filePath = 'C:\\Google Drive\\Universidade\\4º Ano\\ApInf-PCE\\PCE\\RegistosCovid\\NodeMongo\\content\\';
    const filenames = ['doentes.csv', 'registos_covid19.csv', 'cod_postal.csv'];

    // colocar doentes, sem registos em memória
    let doentes = [];
    const fileRead = fs.readFileSync(filePath+filenames[0]);
    let lines = fileRead.toString().split('\n');
    lines = lines.slice(1);
    for(let line of lines) {
        let lineParams = line.split(';');
        if(lineParams[lineParams.length-1].includes('\r')) {
            lineParams[lineParams.length-1] = lineParams[lineParams.length-1].slice(0,-1)
        }

        const newDoente = {
            cod_postal: lineParams[0],
            data_nascimento: lineParams[1],
            genero: lineParams[2],
            id_paciente: lineParams[3],
            nome: lineParams[4],
            registos: []
        }

        // console.log(newDoente)
        doentes.push(newDoente)
    }

    // colocar registos em memória
    let registos = []
    const fileRead_r = fs.readFileSync(filePath + filenames[1]);
    let lines_r = fileRead_r.toString().split('\n');
    lines_r = lines_r.slice(1);
    for (let line_r of lines_r) {
        let lineParams = line_r.split(';');
        if(lineParams[lineParams.length-1].includes('\r')) {
            lineParams[lineParams.length-1] = lineParams[lineParams.length-1].slice(0,-1)
        }

        const newRegisto = {
            num_seq: normalizaVazios(lineParams[0]),
            data_registo: normalizaVazios(lineParams[1]),
            temperatura: normalizaVazios(normalizeTemp(lineParams[2])),
            falta_ar: normalizaVazios(lineParams[3]),
            dor_cabeca: normalizaVazios(lineParams[4]),
            dor_muscular: normalizaVazios(lineParams[5]),
            tosse: normalizaVazios(lineParams[6]),
            diarreia: normalizaVazios(lineParams[7]),
            olfato: normalizaVazios(lineParams[8]),
            avaliacao_global: normalizaVazios(lineParams[9])
        }

        console.log(newRegisto)
        registos.push(newRegisto)
    }
    
    // colocar os registos nos doentes
    doentes.map(x => {
        x.registos = registos.filter(y => y.num_seq == x.id_paciente)
        DoenteController.newDoente(x.id_paciente, x.nome, x.data_nascimento, x.genero, x.cod_postal, x.registos)
        return x;
    })

    console.log(doentes);
}