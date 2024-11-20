const express = require('express');
const rutas = express.Router();

const ProyectoControl = require('../control/ProyectoControl');

rutas.get('/:nombre_tabla/:id', async (req, res) => {
  const {nombre_tabla, id} = req.params
  const ctr = new ProyectoControl(nombre_tabla);
  const proyectos = await ctr.verTodosProyectosRegistro(id)
  res.status(200).json(proyectos)
});

rutas.get('/:id', async (req, res) => {
  const { id } = req.params
  const ctr = new ProyectoControl('');
  const control = await ctr.verInfo(id)
  res.status(control.codigo).json(control.respuesta)
});

rutas.get('/', async (req, res) => {
  const ctr = new ProyectoControl('');
  const control = await ctr.verInfoPrincipal()
  res.status(control.codigo).json(control.respuesta)
});

rutas.post('/:nombre_tabla/:id_registro_tabla', async (req, res) => {
  const { nombre_tabla, id_registro_tabla } = req.params
  const proyectoControl = new ProyectoControl(nombre_tabla)
  const datos = req.body
  const control = await proyectoControl.guardar(datos, id_registro_tabla)
  res.status(control.codigo).json(control.respuesta)
});

rutas.put('/', async (req, res) => {
  const ctr = new ProyectoControl('')
  const actualizado = await ctr.actualizar(req.body)
  if (actualizado){
     res.status(200).json({respuesta: 'Actualizado correctamente'})
  } else {
     res.status(500).json({respuesta: 'Error al actualizar'})
  }
})

rutas.delete('/:nombre_tabla/:id_registro_tabla/:id_proyecto', async (req, res) => {
  const { nombre_tabla, id_proyecto, id_registro_tabla } = req.params;
  const proyectoControl = new ProyectoControl(nombre_tabla)
  const proyectoEliminar = await proyectoControl.verInfoProyecto(id_proyecto)
  if (proyectoEliminar != null && proyectoEliminar != undefined){
      if (proyectoControl.eliminar(id_proyecto, id_registro_tabla)){
        res.status(200).json({ mensaje: 'Proyecto eliminado correctamente' });
      }   
  } else {
    res.status(400).json({ mensaje: 'Ocurrió un error al eliminar el proyecto' });
  }
});

rutas.delete('/eliminar_proyecto_tabla/:nombre_tabla/:id_registro_tabla/:id_proyecto', async (req, res) => {
  const { nombre_tabla, id_proyecto, id_registro_tabla } = req.params;
  const proyectoControl = new ProyectoControl(nombre_tabla)
  const proyectoEliminar = await proyectoControl.verInfoProyecto(id_proyecto)
  if (proyectoEliminar != null && proyectoEliminar != undefined){
      if (proyectoControl.eliminarSoloProyectoTabla(id_proyecto, id_registro_tabla)){
        res.status(200).json({ mensaje: 'Proyecto eliminado correctamente' });
      }   
  } else {
    res.status(400).json({ mensaje: 'Ocurrió un error al eliminar el proyecto' });
  }
});

module.exports = rutas;