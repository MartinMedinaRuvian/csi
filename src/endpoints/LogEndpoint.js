const express = require('express');
const rutas = express.Router();

const Control = require('../control/LogControl');

rutas.get('/', async(req, res) =>{
   const ctr = new Control();
   const control = await ctr.verTodos()
   res.status(control.codigo).json(control.respuesta)
});

rutas.post('/buscarporcondicion', async(req, res) =>{
   const { condicion, buscar, fechaInicial, fechaFinal, buscarPor } = req.body
   const ctr = new Control();
   let control = await ctr.verConFiltro(condicion, buscar)
   if (buscarPor === 2) {
      control = await ctr.verEntreFechas(fechaInicial, fechaFinal)
   } else if (buscarPor === 3) {
      control = await ctr.verFiltradoEntreFechas(condicion, buscar, fechaInicial, fechaFinal)
   }
   res.status(control.codigo).json(control.respuesta)
});

module.exports = rutas