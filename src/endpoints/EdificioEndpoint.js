const express = require('express');
const rutas = express.Router();

const Control = require('../control/EdificioControl');

rutas.get('/', async (req, res) => {
   const ctr = new Control();
   const control = await ctr.verTodos()
   res.status(control.codigo).json(control.respuesta)
});

rutas.get('/:id', async (req, res) => {
   const { id } = req.params
   const ctr = new Control();
   const control = await ctr.verInfo(id)
   res.status(control.codigo).json(control.respuesta)
});

rutas.post('/buscarfiltrado', async (req, res) => {
   const { condicion, buscar } = req.body
   const ctr = new Control();
   const control = await ctr.verConFiltro(condicion, buscar)
   res.status(control.codigo).json(control.respuesta)
});

rutas.post('/', async (req, res) => {
   const ctr = new Control()
   const control = await ctr.guardar(req.body)
   res.status(control.codigo).json(control.respuesta)
})

rutas.put('/', async (req, res) => {
   const ctr = new Control()
   const control = await ctr.actualizar(req.body)
   res.status(control.codigo).json(control.respuesta)
})

rutas.post('/cambiarestado', async (req, res) => {
   const ctr = new Control()
   const control = await ctr.cambiarEstado(req.body)
   res.status(control.codigo).json(control.respuesta)
})

rutas.delete('/:id', async (req, res) => {
   const { id } = req.params
   console.log(id)
   const ctr = new Control()
   const control = await ctr.eliminar(id)
   res.status(control.codigo).json(control.respuesta)
})

module.exports = rutas