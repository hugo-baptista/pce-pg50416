var express = require('express');
var router = express.Router();

var axios = require('axios');
const { response } = require('../app');

router.get('/', function(req, res, next) {
  res.json({
    rota: "sensores"
  })
});

router.get("/identificador/:id", (req, res) => {
  res.json({
    identificador: req.params.id
  })
});

router.get("/acedehpeixoto/:id", (req, res) => {
  axios.get(
    'http://nosql.hpeixoto.me/api/sensor/' + req.params.id
  )
  .then(response => {
    res.json(response.data)
  })
  .catch(error => {
    res.json(error)
  })
});

module.exports = router;
