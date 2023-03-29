var express = require("express");
var router = express.Router();
var axios = require('axios');
var SensorController = require("../controller/sensor")

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
      const {sensorid, sensornum, type_of_sensor} = response.data;
      let newSensorResponse = await SensorController.newSensor(sensorid, sensornum, type_of_sensor);
      if (newSensorResponse.success) {
          res.status(200).json({info: "Novo sensor adicionado com sucesso!"});
      } else {
          res.status(200).json({info: "Erro ao adicionar novo sensor!"});
      }
  })
  .catch(err => {
      console.log(err);
      res.json(err);
  })
})

module.exports = router;