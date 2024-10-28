const express = require('express');
const rutas = express.Router();

const Control = require('../control/TipoControl');

rutas.get('/:nombre_tabla', async (req, res) => {
   const { nombre_tabla } = req.params
   const ctr = new Control(nombre_tabla);
   const control = await ctr.verTodos()
   res.status(control.codigo).json(control.respuesta)
});

rutas.get('/:nombre_tabla/:id', async (req, res) => {
   const { nombre_tabla, id } = req.params
   const ctr = new Control(nombre_tabla);
   const control = await ctr.verPorId(id)
   res.status(control.codigo).json(control.respuesta)
});

rutas.post('/buscarfiltrado/:nombre_tabla', async (req, res) => {
   const { condicion, buscar } = req.body
   const { nombre_tabla } = req.params
   const ctr = new Control(nombre_tabla);
   const control = await ctr.verConFiltro(condicion, buscar)
   res.status(control.codigo).json(control.respuesta)
});

rutas.post('/:nombre_tabla', async (req, res) => {
   const { nombre_tabla } = req.params
   const ctr = new Control(nombre_tabla)
   const control = await ctr.guardar(req.body)
   res.status(control.codigo).json(control.respuesta)
})

rutas.put('/:nombre_tabla', async (req, res) => {
   const { nombre_tabla } = req.params
   const ctr = new Control(nombre_tabla)
   const control = await ctr.actualizar(req.body)
   res.status(control.codigo).json(control.respuesta)
})

rutas.post('/cambiarestado/:nombre_tabla', async (req, res) => {
   const { nombre_tabla } = req.params
   const ctr = new Control(nombre_tabla)
   const control = await ctr.cambiarEstado(req.body)
   res.status(control.codigo).json(control.respuesta)
})

rutas.delete('/:nombre_tabla/:id', async (req, res) => {
   const { nombre_tabla, id } = req.params
   const ctr = new Control(nombre_tabla)
   const control = await ctr.eliminar(id)
   res.status(control.codigo).json(control.respuesta)
})

module.exports = rutas