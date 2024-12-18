const express = require('express');
const rutas = express.Router();

const MantenimientoControl = require('../control/MantenimientoControl');

rutas.get('/:nombre_tabla/:id', async (req, res) => {
  const {nombre_tabla, id} = req.params
  const ctr = new MantenimientoControl(nombre_tabla);
  const mantenimientos = await ctr.verTodosMantenimientosRegistro(id)
  res.status(200).json(mantenimientos)
});

rutas.get('/', async (req, res) => {
  const ctr = new MantenimientoControl('');
  const control = await ctr.verInfoPrincipal()
  res.status(control.codigo).json(control.respuesta)
});

rutas.post('/buscarporcondicion/:nombre_tabla/:id', async (req, res) => {
  const { condicion, buscar, fechaInicial, fechaFinal, buscarPor, limite, pagina } = req.body;
  const {nombre_tabla, id} = req.params
  const offset = (pagina - 1) * limite;
  const ctr = new MantenimientoControl(nombre_tabla);
  let control;
  if (buscarPor === 2) {
      control = await ctr.verTodosMantenimientosRegistroEntreFechas(id, fechaInicial, fechaFinal, limite, offset);
  } else if (buscarPor === 3) {
      control = await ctr.verTodosMantenimientosRegistroFiltrosFecha(id, fechaInicial, fechaFinal, condicion, buscar, limite, offset);
  } else {
      control = await ctr.verTodosMantenimientosRegistroObtenerFiltrado(id, condicion, buscar, limite, offset);
  }

  res.status(control.codigo).json(control.respuesta);
});

rutas.get('/:id', async (req, res) => {
  const { id } = req.params
  const ctr = new MantenimientoControl('');
  const control = await ctr.verInfo(id)
  res.status(control.codigo).json(control.respuesta)
});


rutas.post('/:nombre_tabla/:id_registro_tabla', async (req, res) => {
  const { nombre_tabla, id_registro_tabla } = req.params
  const mantenimientoControl = new MantenimientoControl(nombre_tabla)
  const datos = req.body
  const control = await mantenimientoControl.guardar(datos, id_registro_tabla)
  res.status(control.codigo).json(control.respuesta)
});

rutas.put('/', async (req, res) => {
  const ctr = new MantenimientoControl('')
  const actualizado = await ctr.actualizar(req.body)
  if (actualizado){
     res.status(200).json({respuesta: 'Actualizado correctamente'})
  } else {
     res.status(500).json({respuesta: 'Error al actualizar'})
  }
})

rutas.delete('/:nombre_tabla/:id_registro_tabla/:id_mantenimiento', async (req, res) => {
  const { nombre_tabla, id_mantenimiento, id_registro_tabla } = req.params;
  const mantenimientoControl = new MantenimientoControl(nombre_tabla)
  const mantenimientoEliminar = await mantenimientoControl.verInfo(id_mantenimiento)
  if (mantenimientoEliminar != null && mantenimientoEliminar != undefined){
      if (mantenimientoControl.eliminar(id_mantenimiento, id_registro_tabla)){
        res.status(200).json({ mensaje: 'Mantenimiento eliminado correctamente' });
      }   
  } else {
    res.status(400).json({ mensaje: 'Ocurrió un error al eliminar el mantenimiento' });
  }
});


rutas.delete('/eliminar_mantenimiento_tabla/:nombre_tabla/:id_registro_tabla/:id_mantenimiento', async (req, res) => {
  const { nombre_tabla, id_mantenimiento, id_registro_tabla } = req.params;
  const mantenimientoControl = new MantenimientoControl(nombre_tabla)
  const mantenimientoEliminar = await mantenimientoControl.verInfoMantenimiento(id_mantenimiento)
  if (mantenimientoEliminar != null && mantenimientoEliminar != undefined){
      if (mantenimientoControl.eliminarSoloMantenimientoTabla(id_mantenimiento, id_registro_tabla)){
        res.status(200).json({ mensaje: 'Proyecto eliminado correctamente' });
      }   
  } else {
    res.status(400).json({ mensaje: 'Ocurrió un error al eliminar el mantenimiento' });
  }
});

module.exports = rutas;