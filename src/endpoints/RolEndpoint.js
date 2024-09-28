const express = require('express');
const rutas = express.Router();

const Control = require('../control/RolControl');

rutas.get('/', async(req, res) =>{
   const ctr = new Control();
   const control = await ctr.verTodos()
   res.status(control.codigo).json(control.respuesta)
});

module.exports = rutas