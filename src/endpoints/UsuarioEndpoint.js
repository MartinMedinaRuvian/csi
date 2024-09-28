const express = require('express');
const rutas = express.Router();

const Control = require('../control/UsuarioControl');

rutas.get('/', async(req, res) =>{
   const ctr = new Control()
   const control = await ctr.verTodos()
   res.status(control.codigo).json(control.respuesta)
});

rutas.post('/buscarfiltrado', async(req, res) =>{
  const { condicion, buscar } = req.body
  const ctr = new Control();
  const control = await ctr.verConFiltro(condicion, buscar)
  res.status(control.codigo).json(control.respuesta)
});


rutas.post('/', async(req, res)=>{
    const ctr = new Control()
    const control = await ctr.guardar(req.body)
    res.status(control.codigo).json(control.respuesta)
});

rutas.put('/', async(req, res) =>{
  const ctr = new Control()
  const control = await ctr.actualizar(req.body)
  res.status(control.codigo).json(control.respuesta)
})

rutas.put('/cambiarpassword', async(req, res) =>{
  const ctr = new Control()
  const control = await ctr.cambiarPassword(req.body)
  res.status(control.codigo).json(control.respuesta)
})

rutas.post('/ingresar', async (req, res)=>{
  const { identificacion, password } = req.body
  const ctr = new Control()
  const control = await ctr.verificar(identificacion, password)
  res.status(control.codigo).json(control.respuesta)
});

rutas.post('/cambiarestado', async(req, res) =>{
  const ctr = new Control()
  const control = await ctr.cambiarEstado(req.body)
  res.status(control.codigo).json(control.respuesta)
})

rutas.delete('/:codigo', async(req, res) =>{
  const { codigo } = req.params
  const ctr = new Control()
  const control = await ctr.eliminar(codigo)
  res.status(control.codigo).json(control.respuesta)
})

module.exports = rutas;