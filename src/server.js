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
 * Importo rutas a usar en el servidor
 */
const usuarioEndpoint = require('./endpoints/UsuarioEndpoint')
const rolEndpoint = require('./endpoints/RolEndpoint')
const subirArchivosEndpoint = require('./endpoints/SubirArchivoEndpoint')
const edificioEndpoint = require('./endpoints/EdificioEndpoint')
const imagenEndpoint = require('./endpoints/ImagenEndpint')
const centroCableadoEndpoint = require('./endpoints/CentroCableadoEnpoint')

/**
 * configuro las rutas del servidor
 */
app.use('/usuario', usuarioEndpoint)
app.use('/rol', rolEndpoint)
app.use('/archivo', verificarToken, subirArchivosEndpoint)
app.use('/imagen', verificarToken, imagenEndpoint)
app.use('/edificio', verificarToken, edificioEndpoint)
app.use('/centro_cableado', verificarToken, centroCableadoEndpoint)


module.exports = app;
