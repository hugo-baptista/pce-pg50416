var express = require("express");
var router = express.Router();
var axios = require('axios');
const { route } = require(".");
const mongoose = require('mongoose');
const SensorModel = require("../model/sensor");

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
    mongoose.connect('mongodb://localhost:9000/leituras');

    SensorModel.find((err, sensors) => {
        if (err) {
            res.json(err);
        } else {
            res.json(sensors);
        }
    });

    mongoose.connection.close();
})

router.get("/:id", (req, res) => {
    mongoose.connect('mongodb://localhost:9000/leituras');

    SensorModel.find({sensor_id: req.params.id}, (err, sensors) => {
        if (err) {
            res.json(err);
        } else {
            res.json(sensors);
        }
    });

    mongoose.connection.close();
})

module.exports = router;
