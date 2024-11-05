const Mantenimiento = require('../modelo/Mantenimiento')
const conexion = require('../util/conexion_mysql')

let nombreTablaGeneral = 'mantenimiento'

class MantenimientoDAO {

  nombreTabla

  constructor(nombre_tabla) {
    this.nombreTabla = nombre_tabla
  }

  async guardarMantenimiento(dato) {
    const { codigo, observacion, realizado_por, fecha, fecha_creacion, estado } = dato
    console.log(fecha_creacion, 'fecha creacion')
    const datoGuardar = new Mantenimiento(codigo, observacion, realizado_por, fecha, fecha_creacion, null, estado)
    const guardar = await conexion.query('INSERT INTO ' + nombreTablaGeneral + ' SET ?', [datoGuardar])
    return guardar.affectedRows > 0 ? guardar.insertId : -1
  }

  async guardarMantenimientoTabla(id_mantenimiento, id_tabla) {
    const nombreTablaGuardar = this.nombreTabla + '_mantenimiento'
    const columnaTablaGuardar = 'id_' + this.nombreTabla
    console.log(nombreTablaGuardar, columnaTablaGuardar, 'prueba')
    const queryGuardar = 'INSERT INTO ' + nombreTablaGuardar + ' (id_mantenimiento,' + columnaTablaGuardar + ') VALUES (?,?)'
    const guardar = await conexion.query(queryGuardar, [id_mantenimiento, id_tabla])
    return guardar.affectedRows > 0 ? guardar.insertId : -1
  }

  async verTodosMantenimientosPorIdRegistro(id) {
    const nombreTablaConsultar = this.nombreTabla + '_mantenimiento'
    const columnaTablaConsultar = 'id_' + this.nombreTabla
    const datos = await conexion.query('SELECT m.id, m.codigo, m.observacion, m.realizado_por, m.fecha, m.estado FROM ' + nombreTablaConsultar + ' INNER JOIN mantenimiento m ON m.id = id_mantenimiento WHERE ' + columnaTablaConsultar + '=?', [id])
    return datos
  }

  async yaExisteMantenimiento(codigo) {
    const yaExiste = await conexion.query('SELECT codigo FROM ' + nombreTablaGeneral + ' WHERE codigo=?', [codigo])
    console.log(yaExiste, 'existe mantenimiento')
    return yaExiste.length > 0
  }

  async yaExisteMantenimientoEnElemento(codigo, id) {
    const nombreTablaConsultar = this.nombreTabla + '_mantenimiento'
    const columnaTablaConsultar = 'id_' + this.nombreTabla
    console.log(codigo, id)
    const query = 'SELECT m.codigo FROM ' + nombreTablaGeneral + ' m INNER JOIN ' + nombreTablaConsultar + ' b ON m.id=b.id_mantenimiento WHERE m.codigo=? AND b.' + columnaTablaConsultar + '=?'
    console.log(query)
    const yaExiste = await conexion.query(query, [codigo, id])
    console.log(yaExiste, 'existe')
    return yaExiste.length > 0
  }

  async verIdMantenimientoPorCodigo(codigo) {
    const datos = await conexion.query('SELECT id FROM ' + nombreTablaGeneral + ' WHERE codigo=?', [codigo])
    return datos[0].id
  }

  async verInfo(id_mantenimiento) {
    console.log(id_mantenimiento, 'ver infoooo')
    const datos = await conexion.query('SELECT id, codigo, observacion, realizado_por, fecha, estado FROM ' + nombreTablaGeneral + ' WHERE id=?', [id_mantenimiento])
    return datos[0]
  }

  async eliminarMantenimiento(id_mantenimiento) {
    console.log(id_mantenimiento, 'ideli')
    const eliminar = await conexion.query('DELETE FROM ' + nombreTablaGeneral + ' WHERE id=?', [id_mantenimiento]);
    return eliminar.affectedRows > 0
  }

  async eliminarMantenimientoTabla(id_mantenimiento, id_registro_tabla) {
    const nombreTablaEliminar = this.nombreTabla + '_mantenimiento'
    const columnaTablaEliminar = 'id_' + this.nombreTabla
    const queryEliminar = 'DELETE FROM ' + nombreTablaEliminar + " WHERE id_mantenimiento=" + id_mantenimiento + " AND " + columnaTablaEliminar + "=" + id_registro_tabla
    console.log(queryEliminar);
    const eliminar = await conexion.query(queryEliminar);
    return eliminar.affectedRows > 0
  }

}

module.exports = MantenimientoDAO