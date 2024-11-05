const express = require('express');
const rutas = express.Router();

const MantenimientoControl = require('../control/MantenimientoControl');

rutas.get('/:nombre_tabla/:id', async (req, res) => {
  const {nombre_tabla, id} = req.params
  const ctr = new MantenimientoControl(nombre_tabla);
  const proyectos = await ctr.verTodosMantenimientosRegistro(id)
  res.status(200).json(proyectos)
});

rutas.get('/:id', async (req, res) => {
  const { id } = req.params
  const ctr = new MantenimientoControl('');
  const control = await ctr.verInfo(id)
  res.status(control.codigo).json(control.respuesta)
});


rutas.post('/:nombre_tabla/:id_registro_tabla', async (req, res) => {
  const { nombre_tabla, id_registro_tabla } = req.params
  const proyectoControl = new MantenimientoControl(nombre_tabla)
  const datos = req.body
  const control = await proyectoControl.guardar(datos, id_registro_tabla)
  res.status(control.codigo).json(control.respuesta)
});

rutas.delete('/:nombre_tabla/:id_registro_tabla/:id_proyecto', async (req, res) => {
  const { nombre_tabla, id_proyecto, id_registro_tabla } = req.params;
  const proyectoControl = new MantenimientoControl(nombre_tabla)
  const proyectoEliminar = await proyectoControl.verInfoMantenimiento(id_proyecto)
  if (proyectoEliminar != null && proyectoEliminar != undefined){
      if (proyectoControl.eliminar(id_proyecto, id_registro_tabla)){
        if (controlMantenimientos.eliminarMantenimiento(proyectoEliminar.ruta)){
          res.status(200).json({ mensaje: 'Mantenimiento eliminado correctamente' });
        }
      }   
  } else {
    res.status(400).json({ mensaje: 'Ocurrió un error al eliminar el proyecto' });
  }
});

module.exports = rutas;