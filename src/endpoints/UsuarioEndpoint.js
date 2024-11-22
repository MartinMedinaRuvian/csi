const express = require('express');
const rutas = express.Router();
const jwt = require('jsonwebtoken');
require("dotenv").config();
const bcrypt = require('bcrypt');
const saltRounds = 10
const LogDAO = require('../dao/LogDAO');

const getClientIp = (req) => {
  const xForwardedFor = req.headers['x-forwarded-for'];
  return xForwardedFor ? xForwardedFor.split(',')[0] : req.ip || req.connection.remoteAddress;
};

const Control = require('../control/UsuarioControl');
const ControlPasswordReset = require('../control/PasswordResetControl');

async function guardarLogAuditoria(idUsuario, email, method, originalUrl, observacion, clientIp) {
  const dao = new LogDAO();
  const accion = `${method} ${originalUrl}`
  await dao.guardar(idUsuario, email, accion, observacion, clientIp);
}

rutas.get('/', async (req, res) => {
  const ctr = new Control()
  const control = await ctr.verTodos()
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
});

rutas.put('/', async (req, res) => {
  const ctr = new Control()
  const control = await ctr.actualizar(req.body)
  res.status(control.codigo).json(control.respuesta)
})

rutas.put('/cambiarpassword', async (req, res) => {
  const ctr = new Control()
  const control = await ctr.cambiarPassword(req.body)
  res.status(control.codigo).json(control.respuesta)
})

rutas.post('/ingresar', async (req, res) => {
  const { email, password } = req.body
  const { method, originalUrl } = req;
  const ctr = new Control()
  const control = await ctr.verificar(email, password)

  console.log(control, 'controls')

  if (control.codigo !== 500) {
    const idUsuario = control.respuesta.id
    //CREAR EL TOKEN
    const token = jwt.sign({
      email,
      id: idUsuario
    }, process.env.TOKEN_SECRETO,
    { expiresIn: process.env.TIEMPO_TOKEN })
    
    control.respuesta.token = token
    await guardarLogAuditoria(idUsuario, email, method, originalUrl, 'Ingreso al sistema', getClientIp(req))
  }
  res.status(control.codigo).json(control.respuesta)
});

rutas.post('/cambiarestado', async (req, res) => {
  const ctr = new Control()
  const control = await ctr.cambiarEstado(req.body)
  res.status(control.codigo).json(control.respuesta)
})

rutas.delete('/:codigo', async (req, res) => {
  const { codigo } = req.params
  const ctr = new Control()
  const control = await ctr.eliminar(codigo)
  res.status(control.codigo).json(control.respuesta)
})


rutas.get('/enviar-email-password-reset/:email', async (req, res) => {
  const {email} = req.params
  const ctr = new ControlPasswordReset()
  const control = await ctr.sendPasswordResetEmail(email)
  res.status(control.codigo).json(control.respuesta)
});


rutas.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;
  const { method, originalUrl } = req;
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRETO_CAMBIO_PASSWORD);
    const email = decoded.email
    const idUsuario = decoded.id
    const passwordActualizar = bcrypt.hashSync(newPassword, saltRounds);

    const ctr = new Control()
    const control = await ctr.actualizarPassword(email, passwordActualizar)
    await guardarLogAuditoria(idUsuario, email, method, originalUrl, 'Cambio de clave', getClientIp(req))
    res.status(control.codigo).json(control.respuesta)

  } catch (error) {
    console.log(error, 'error')
    res.status(500).json('Token inválido o expirado');
  }
})


module.exports = rutas;