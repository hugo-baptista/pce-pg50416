var express = require("express");
var router = express.Router();
var axios = require('axios');
const { route } = require(".");
const mongoose = require('mongoose');
const SensorModel = require("../model/sensor");
const SensorController = require("../controller/sensor");

router.get("/", (req, res) => {
    res.json({
        rota: "sensores"
    })
})

router.get("/identificador/:id", (req, res) => {
    res.json({
        identificador: req.params.id,
    })
})

router.get("/acedehpeixoto/:id", (req, res) => {
    axios.get(
        'http://nosql.hpeixoto.me/api/sensor/' + req.params.id
    )
    .then(response => {
        res.json(response.data);
    })
    .catch(err => {
        console.log(err)
        res.json(err);
    })

})

router.get("/list", (req, res) => {
    SensorModel.find((err, sensors) => {
        if (err) {
            res.json(err);
        } else {
            res.json(sensors);
        }
    });
})

router.put("/update", async (req, res) => {
    const {sensor_id, new_info} = req.body;
    let updateSensorResponse = await SensorController.updateSensor(sensor_id, new_info.sensor_num, new_info.type_of_sensor);
    if (updateSensorResponse.success) {
        res.status(200).json({info: "Sensor atualizado com sucesso!"})
    } else {
        res.status(200).json({info: "Erro ao atualizar sensor!"})
    }
})

router.delete("/delete/:id", async (req, res) => {
    let removeSensorResponse = await SensorController.removeSensor(req.params.id);
    if (removeSensorResponse.success) {
        res.status(200).json({info: "Sensor removido com sucesso!"})
    } else {
        res.status(200).json({info: "Erro ao remover sensor!"})
    }
})

router.get("/:id", (req, res) => {
    SensorModel.find({sensor_id: req.params.id}, (err, sensors) => {
        if (err) {
            res.json(err);
        } else {
            res.json(sensors);
        }
    });
})

router.post("/new", async (req, res) => {
    const {sensorid, sensornum, type_of_sensor} = req.body;
    let newSensorResponse = await SensorController.newSensor(sensorid, sensornum, type_of_sensor);
    if (newSensorResponse.success) {
        res.status(200).json({success: true, info: "Sensor adicionado com sucesso!"});
    } else {
        res.status(200).json({success: false, info: "Erro ao adicionar sensor!"});
    };
})

module.exports = router;
