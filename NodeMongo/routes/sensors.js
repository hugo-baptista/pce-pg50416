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
    const {sensor_id, sensor_num, type_of_sensor} = req.body;
    console.log(sensor_id, sensor_num, type_of_sensor);
    let updateSensorResponse = await SensorController.updateSensor(sensor_id, sensor_num, type_of_sensor);
    if (updateSensorResponse.success) {
        res.status(200).json({info: "Sensor atualizado com sucesso!"})
        // .send(updateSensorResponse.response)
    } else {
        res.status(200).json({info: "Erro ao atualizar sensor!",
            sensor_id:sensor_id,
            sensor_num:sensor_num,
            type_of_sensor:type_of_sensor
        })
    }
})

router.delete("/remove", async (req, res) => {
    const {sensor_id} = req.body;
    let removeSensorResponse = await SensorController.removeSensor(sensor_id);
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

module.exports = router;
