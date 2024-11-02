const express = require('express');
const rutas = express.Router();

const ProyectoControl = require('../control/ProyectoControl');

rutas.get('/:nombre_tabla/:id', async (req, res) => {
  const {nombre_tabla, id} = req.params
  const ctr = new ProyectoControl(nombre_tabla);
  const proyectos = await ctr.verTodosProyectosRegistro(id)
  res.status(200).json(proyectos)
});

rutas.post('/:nombre_tabla/:id_registro_tabla', async (req, res) => {
  const { nombre_tabla, id_registro_tabla } = req.params
  const proyectoControl = new ProyectoControl(nombre_tabla)
  const datos = req.body
  const control = await proyectoControl.guardar(datos, id_registro_tabla)
  res.status(control.codigo).json(control.respuesta)
});

rutas.delete('/:nombre_tabla/:id_registro_tabla/:id_proyecto', async (req, res) => {
  const { nombre_tabla, id_proyecto, id_registro_tabla } = req.params;
  const proyectoControl = new ProyectoControl(nombre_tabla)
  const proyectoEliminar = await proyectoControl.verInfoProyecto(id_proyecto)
  if (proyectoEliminar != null && proyectoEliminar != undefined){
      if (proyectoControl.eliminar(id_proyecto, id_registro_tabla)){
        if (controlProyectos.eliminarProyecto(proyectoEliminar.ruta)){
          res.status(200).json({ mensaje: 'Proyecto eliminado correctamente' });
        }
      }   
  } else {
    res.status(400).json({ mensaje: 'Ocurrió un error al eliminar el proyecto' });
  }
});

module.exports = rutas;