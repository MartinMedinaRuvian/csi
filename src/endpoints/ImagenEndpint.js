const express = require('express');
const rutas = express.Router();

const Control = require('../control/ImagenControl');

const ControlAchivos = require('../control/SubirArchivoControl');
const controlArchivos = new ControlAchivos()

rutas.put('/:nombre_tabla/:id', controlArchivos.upload.single('archivo'), async (req, res) => {
   const { nombre_tabla, id  } = req.params
   if (req.file != null && req.file != undefined) {
      const nombreArchivo = req.file.filename
      const ruta_imagen = 'archivos/' + nombreArchivo
      const ctr = new Control(nombre_tabla)
      const infoActualizada = await ctr.actualizarImagen(id, ruta_imagen)
      if (infoActualizada) {
         res.status(200).json({ mensaje: 'Imagen Actualizada correctamente' });
      } else {
         res.status(400).json({ mensaje: 'Error al actualizar imagen' })
      }
   } else {
      res.status(400).json({ mensaje: 'Debe seleccionar una imagen' })
   }
})

rutas.delete('/:nombre_tabla/:id/:nombre_archivo', async (req, res) =>{
   const { nombre_tabla, id, nombre_archivo } = req.params
   const ruta_imagen = 'archivos/' + nombre_archivo
   if(controlArchivos.eliminarArchivo(ruta_imagen)){
      const ctr = new Control(nombre_tabla)
      const infoActualizada = await ctr.actualizarImagen(id, null)
      if (infoActualizada){
         res.status(200).json({ mensaje: 'Imagen eliminada correctamente'})
      }
   } else {
      res.status(400).json({ mensaje: 'Error al eliminar imagen' })
   }
})


module.exports = rutas