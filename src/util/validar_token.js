const jwt = require('jsonwebtoken')
require("dotenv").config();

// middleware to validate token (rutas protegidas)
const verificarToken = (req, res, next) => {
  const authorization = req.header('Authorization')
  if (authorization != null && authorization != undefined && authorization.length > 0) {
    const token = authorization.split(' ')[1]
    try {
      const verificado = jwt.verify(token, process.env.TOKEN_SECRETO)
      next() // continuamos
    } catch (error) {
      res.status(400).json({ error: 'token no es válido' })
    }
  } else {
    return res.status(401).json({ error: 'Acceso denegado' })
  }
}

module.exports = verificarToken;