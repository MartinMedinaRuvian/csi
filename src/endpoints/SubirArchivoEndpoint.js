const express = require('express');
const rutas = express.Router();

const Control = require('../control/SubirArchivoControl');
const controlArchivos = new Control()
const ArchivoControl = require('../control/ArchivoControl');

rutas.post('/:nombre_tabla/:id_registro_tabla', controlArchivos.upload.single('file'), (req, res) => {
  const { nombre_tabla, id_registro_tabla } = req.params
  const archivoControl = new ArchivoControl(nombre_tabla)
  const nombreArchivo = req.file.filename
  const nombreArchivoOriginal = req.file.originalname
  if (archivoControl.guardar(nombreArchivo, nombreArchivoOriginal, id_registro_tabla))
  res.status(200).json(req.file);
});

rutas.delete('/:nombre_tabla/:id_registro_tabla/:id_archivo', async (req, res) => {
  const { nombre_tabla, id_archivo, id_registro_tabla } = req.params;
  const archivoControl = new ArchivoControl(nombre_tabla)
  const archivoEliminar = await archivoControl.verInfoArchivo(id_archivo)
  if (archivoEliminar != null && archivoEliminar != undefined){
      if (archivoControl.eliminar(id_archivo, id_registro_tabla)){
        if (controlArchivos.eliminarArchivo(archivoEliminar.ruta)){
          res.status(200).json({ mensaje: 'Archivo eliminado correctamente' });
        }
      }   
  } else {
    res.status(400).json({ mensaje: 'Ocurrió un error al eliminar el archivo' });
  }
});

module.exports = rutas;