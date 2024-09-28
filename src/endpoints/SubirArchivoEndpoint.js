const express = require('express');
const rutas = express.Router();

const Control = require('../control/SubirArchivoControl');
const controlArchivos = new Control()

rutas.get('/', async(req, res) =>{
   const ctr = new Control()
   
});

rutas.post('/', controlArchivos.upload.single('file'), (req, res) => {
  res.status(200).json(req.file);
});

rutas.put('/', async(req, res) =>{
  const ctr = new Control()

})

rutas.delete('/:file', (req, res) => {
  const { file } = req.params;
  if (fileService.eliminarArchivo(file)) {
    res.status(200).json({ mensaje: 'Archivo eliminado correctamente' });
  } else {
    res.status(400).json({ mensaje: 'Ocurrió un error al eliminar el archivo' });
  }
});

module.exports = rutas;