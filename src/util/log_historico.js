const jwt = require('jsonwebtoken');
const DAO = require('../dao/LogDAO');
require('dotenv').config();

const getClientIp = (req) => {
  const xForwardedFor = req.headers['x-forwarded-for'];
  return xForwardedFor ? xForwardedFor.split(',')[0] : req.ip || req.connection.remoteAddress;
};

const observacionPorMethod = (method) => {
  let observacion = ''
  switch (method) {
    case 'POST':
      observacion = 'Se creo un nuevo registro'
      break
    case 'PUT':
      observacion = 'Se actualizo un registro'
      break
    case 'DELETE':
      observacion = 'Se elimino un registro'
      break
    default:
      observacion = 'Se creo un nuevo registro'
      break
  }
  return observacion
}

const logMiddleware = async (req, res, next) => {
  try {
    const { method, originalUrl } = req;
    if (method !== 'GET') {
      const clientIp = getClientIp(req);
      let idUsuario = null;

      // Verifica y extrae el encabezado Authorization
      const authorization = req.headers['authorization'];
      console.log('Authorization Header:', authorization);

      if (authorization && authorization.startsWith('Bearer ')) {
        const token = authorization.split(' ')[1];
        try {
          const decoded = jwt.verify(token, process.env.TOKEN_SECRETO);
          idUsuario = decoded.id;
          emailUsuario = decoded.email
        } catch (error) {
          console.error('Error al verificar el token:', error.message);
        }
      } else {
        console.error('Encabezado Authorization no presente o mal formado');
      }
      // Guarda el log en la base de datos
      const dao = new DAO();
      const accion = `${method} ${originalUrl}`
      let observacion = observacionPorMethod(method)
        await dao.guardar(idUsuario, emailUsuario, accion, observacion, clientIp);
    }
  } catch (error) {
    console.error('Error en el middleware:', error.message);
  }

  next();
};

module.exports = logMiddleware;
