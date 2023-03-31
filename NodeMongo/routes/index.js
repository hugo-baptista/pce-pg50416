var express = require("express");
var router = express.Router();
var axios = require('axios');
const { v4: uuidv4 } = require('uuid');
var CaretakerController = require("../controller/caretaker");
var ClinicalInfoController = require("../controller/clinicalinfo");
var PacientController = require("../controller/pacient");
var SensorController = require("../controller/sensor");
var ServiceController = require("../controller/service");

router.get("/", (req, res) => {
  res.json({
    rota: "index"
  })
})

router.get("/acedehpeixoto/:id", (req, res) => {
  axios.get(
      'http://nosql.hpeixoto.me/api/sensor/' + req.params.id
  )
  .then(async response => {
    // caretakers
    var all = true;
    var some = false;
    const {careteam} = response.data;
    const promises = careteam.map((caretaker) => {
      return CaretakerController.newCaretaker(caretaker.id, caretaker.nome)
        .then(response => {
          if (response.success) {
            some = true;
          } else {
            all = false;
          }
        })
    });
    await Promise.all(promises);
    var caretakers_res;
    if (all) {
      caretakers_res = "Caretakers adicionados com sucesso!";
    } else if (some) {
      caretakers_res = "Alguns caretakers adicionados com sucesso!";
    } else {
      caretakers_res = "Erro ao adicionar caretakers!";
    }

    // clinicalinfo
    const {admdate, bed, bodytemp, bloodpress, bpm, sato2, timestamp} = response.data;
    let newClinicalInfo = await ClinicalInfoController.newClinicalInfo(uuidv4(), admdate, bed, bodytemp, bloodpress.systolic, bloodpress.diastolic, bpm, sato2, timestamp)
    var clinicalinfo_res;
    if (newClinicalInfo.success) {
      clinicalinfo_res = "Informação clínica adicionada com sucesso!";
    } else {
      clinicalinfo_res = "Erro ao adicionar informação clínica!";
    }

    // pacient
    const {patient} = response.data;
    let newPacientResponse = await PacientController.newPacient(patient.patientid, patient.patientname, patient.patientbirthdate, patient.patientage);
    var pacient_res;
    if (newPacientResponse.success) {
      pacient_res = "Paciente adicionado com sucesso!";
    } else {
      pacient_res = "Erro ao adicionar paciente!";
    }

    // sensor
    const {sensorid, sensornum, type_of_sensor} = response.data;
    let newSensorResponse = await SensorController.newSensor(sensorid, sensornum, type_of_sensor);
    var sensor_res;
    if (newSensorResponse.success) {
      sensor_res = "Sensor adicionado com sucesso!";
    } else {
      sensor_res = "Erro ao adicionar sensor!";
    }

    // service
    const {servicecod, servicedesc} = response.data;
    let newServiceResponse = await ServiceController.newService(servicecod, servicedesc);
    var service_res;
    if (newServiceResponse.success) {
      service_res = "Serviço adicionado com sucesso!";
    } else {
      service_res = "Erro ao adicionar serviço!";
    }

    // resposta
    res.status(200).json({
      caretakers_info: caretakers_res,
      clinicalinfo_info: clinicalinfo_res,
      pacient_info: pacient_res,
      sensor_info: sensor_res,
      service_info: service_res,
    });
  })
  .catch(err => {
      console.log(err);
      res.json(err);
  })
})


router.get("/acedehpeixotoalt/:id", (req, res) => {
  axios.get(
      'http://nosql.hpeixoto.me/api/sensor/' + req.params.id
  )
  .then(async response => {
    // caretakers
    const {careteam} = response.data;
    const promises = careteam.map((caretaker) => {
      return CaretakerController.newCaretaker(caretaker.id, caretaker.nome)
        .then(response => {
          if (!response.success) {
            throw "Erro ao adicionar caretakers!";
          }
        })
    });
    await Promise.all(promises);

    // clinicalinfo
    const {admdate, bed, bodytemp, bloodpress, bpm, sato2, timestamp} = response.data;
    let newClinicalInfo = await ClinicalInfoController.newClinicalInfo(uuidv4(), admdate, bed, bodytemp, bloodpress.systolic, bloodpress.diastolic, bpm, sato2, timestamp)
    if (!newClinicalInfo.success) {
      throw "Erro ao adicionar informação clínica!";
    }

    // pacient
    const {patient} = response.data;
    let newPacientResponse = await PacientController.newPacient(patient.patientid, patient.patientname, patient.patientbirthdate, patient.patientage);
    if (!newPacientResponse.success) {
      throw "Erro ao adicionar paciente!";
    }

    // sensor
    const {sensorid, sensornum, type_of_sensor} = response.data;
    let newSensorResponse = await SensorController.newSensor(sensorid, sensornum, type_of_sensor);
    if (!newSensorResponse.success) {
      throw "Erro ao adicionar sensor!";
    }

    // service
    const {servicecod, servicedesc} = response.data;
    let newServiceResponse = await ServiceController.newService(servicecod, servicedesc);
    if (!newServiceResponse.success) {
      throw "Erro ao adicionar serviço!";
    }

    // resposta
    res.status(200).json({success: true, info: "Leitura adicionada com sucesso"});
  })
  .catch(err => {
    res.status(500).json({success: false, info: err});
  })
})

module.exports = router;