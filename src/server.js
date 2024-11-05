const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const verificarToken = require('./util/validar_token')
//const history = require('connect-history-api-fallback');

const app = express();

/**
 * Middlewares
 */
app.use(cors())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
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

/**
 * configuro las rutas del servidor
 */
app.use('/usuario', usuarioEndpoint)
app.use('/rol', rolEndpoint)
app.use('/archivo', verificarToken, archivosEndpoint)
app.use('/imagen', verificarToken, imagenEndpoint)
app.use('/edificio', verificarToken, edificioEndpoint)
app.use('/centro_cableado', verificarToken, centroCableadoEndpoint)
app.use('/gabinete', verificarToken, gabineteEndpoint)
app.use('/tipo_gabinete', verificarToken, tipoGabineteEndpoint)
app.use('/elemento_activo', verificarToken, elementoActivoEndpoint)
app.use('/elemento_pasivo', verificarToken, elementoPasivoEndpoint)
app.use('/tipo_elemento', verificarToken, tipoElementoEndpoint)
app.use('/tipo', verificarToken, tipoEndpoint)
app.use('/proyecto', verificarToken, proyectoEndpoint)
app.use('/mantenimiento', verificarToken, mantenimientoEndpoint)


module.exports = app;
