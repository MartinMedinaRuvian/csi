const express = require('express');
const rutas = express.Router();

const Control = require('../control/SubirArchivoControl');
const controlArchivos = new Control()
const ArchivoControl = require('../control/ArchivoControl');

rutas.get('/', async(req, res) =>{
   const ctr = new Control()
   
});

rutas.post('/:nombre_tabla/:id_registro_tabla', controlArchivos.upload.single('file'), (req, res) => {
  const { nombre_tabla, id_registro_tabla } = req.params
  console.log(nombre_tabla, 'nametable')
  const archivoControl = new ArchivoControl(nombre_tabla)
  const nombreArchivo = req.file.filename
  if (archivoControl.guardar(nombreArchivo, id_registro_tabla))
  res.status(200).json(req.file);
});

rutas.put('/', async(req, res) =>{
  const ctr = new Control()

})

rutas.delete('/:file', (req, res) => {
  const { file } = req.params;
  if (controlArchivos.eliminarArchivo(file)) {
    res.status(200).json({ mensaje: 'Archivo eliminado correctamente' });
  } else {
    res.status(400).json({ mensaje: 'Ocurrió un error al eliminar el archivo' });
  }
});

module.exports = rutas;