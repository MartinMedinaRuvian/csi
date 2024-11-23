const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
//const history = require('connect-history-api-fallback');
const verificarToken = require('./util/validar_token')
const logMiddleware = require('./util/log_historico');


const app = express();

/**
 * Middlewares
 */
app.use(cors())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//app.use(logMiddleware);
/**
 * El history le permite al backend relacionar el modo history de vue para que las rutas se maneje directamente en el front
 */
//app.use(history());

/**
 * Configuro la carpeta publica donde va ir todo el frontend
 */
 app.use(express.static(path.join(__dirname, 'publico')))

  /**
  * Configuro carpeta publica y estatica para acceder a los archivos
  */
  app.use('/archivos', express.static(path.join(__dirname, 'archivos')));
 
/**
 * Importo rutas a usar en el servidor
 */
const usuarioEndpoint = require('./endpoints/UsuarioEndpoint')
const rolEndpoint = require('./endpoints/RolEndpoint')
const archivosEndpoint = require('./endpoints/ArchivoEndpoint')
const edificioEndpoint = require('./endpoints/EdificioEndpoint')
const imagenEndpoint = require('./endpoints/ImagenEndpoint')
const centroCableadoEndpoint = require('./endpoints/CentroCableadoEndpoint')
const gabineteEndpoint = require('./endpoints/GabineteEndpoint')
const tipoGabineteEndpoint = require('./endpoints/TipoGabineteEndpoint')
const elementoActivoEndpoint = require('./endpoints/ElementoActivoEndpoint')
const elementoPasivoEndpoint = require('./endpoints/ElementoPasivoEndpoint')
const tipoElementoEndpoint = require('./endpoints/TipoElementoEndpoint')
const tipoEndpoint = require('./endpoints/TipoEndpoint')
const proyectoEndpoint = require('./endpoints/ProyectoEndpoint')
const mantenimientoEndpoint = require('./endpoints/MantenimientoEndpoint')
const logEndpoint = require('./endpoints/LogEndpoint')

/**
 * configuro las rutas del servidor
 */
app.use('/usuario', usuarioEndpoint)
app.use('/rol', rolEndpoint)
app.use('/archivo', verificarToken, logMiddleware, archivosEndpoint)
app.use('/imagen', verificarToken, logMiddleware, imagenEndpoint)
app.use('/edificio', verificarToken, logMiddleware, edificioEndpoint)
app.use('/centro_cableado', verificarToken, logMiddleware, centroCableadoEndpoint)
app.use('/gabinete', verificarToken, logMiddleware, gabineteEndpoint)
app.use('/tipo_gabinete', verificarToken, logMiddleware, tipoGabineteEndpoint)
app.use('/elemento_activo', verificarToken, logMiddleware, elementoActivoEndpoint)
app.use('/elemento_pasivo', verificarToken, logMiddleware, elementoPasivoEndpoint)
app.use('/tipo_elemento', verificarToken, logMiddleware, tipoElementoEndpoint)
app.use('/tipo', verificarToken, logMiddleware, tipoEndpoint)
app.use('/proyecto', verificarToken, logMiddleware, proyectoEndpoint)
app.use('/mantenimiento', verificarToken, logMiddleware, mantenimientoEndpoint)
app.use('/log', verificarToken, logEndpoint)

module.exports = app;
