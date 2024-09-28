const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const history = require('connect-history-api-fallback');

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
const clienteRutas = require('./endpoints/ClienteRutas')
const usuarioRutas = require('./endpoints/UsuarioRutas')
const rolRutas = require('./endpoints/RolRutas')
const ventaRutas = require('./endpoints/VentaRutas')
const productoRutas = require('./endpoints/ProductoRutas')
const placaRutas = require('./endpoints/PlacaRutas')

/**
 * configuro las rutas del servidor
 */
app.use('/cliente', clienteRutas)
app.use('/usuario', usuarioRutas)
app.use('/rol', rolRutas)
app.use('/venta', ventaRutas)
app.use('/producto', productoRutas)
app.use('/placa', placaRutas)

module.exports = app;
