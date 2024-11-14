const express = require('express');
const rutas = express.Router();
const jwt = require('jsonwebtoken');
require("dotenv").config();

const Control = require('../control/UsuarioControl');
const ControlPasswordReset = require('../control/PasswordResetControl');

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
  const ctr = new Control()
  const control = await ctr.verificar(email, password)

  if (control.codigo > -1) {
    //CREAR EL TOKEN
    const token = jwt.sign({
      email
    }, process.env.TOKEN_SECRETO,
    { expiresIn: process.env.TIEMPO_TOKEN })
    
    control.respuesta.token = token
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
  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.TOKEN_SECRETO);
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Aquí puedes actualizar la contraseña en la base de datos
    // Ejemplo: await User.updatePassword(decoded.email, hashedPassword);
    const ctr = new Control()
    const control = await ctr.actualizarPassword(decoded.email, hashedPassword)
    res.status(control.codigo).json(control.respuesta)

    //res.status(200).json(decoded.email)
  } catch (error) {
    res.status(400).json({ error: 'Token inválido o expirado' });
  }
})

module.exports = rutas;