const Proyecto = require('../modelo/Proyecto')
const conexion = require('../util/conexion_mysql')
const GenerarQueryActualizarDB = require('../util/generar_query_actualizar_db')

let nombreTablaGeneral = 'proyecto'
const idPropiedad = 'id'

class ProyectoDAO {

  nombreTabla

  constructor(nombre_tabla) {
    this.nombreTabla = nombre_tabla
  }

  async guardarProyecto(dato) {
    const { codigo, descripcion, certificacion, nombre_empresa, nit_empresa, fecha, fecha_creacion, estado } = dato
    const datoGuardar = new Proyecto(codigo, descripcion, certificacion, nombre_empresa, nit_empresa, fecha, fecha_creacion, null, estado)
    const guardar = await conexion.query('INSERT INTO ' + nombreTablaGeneral + ' SET ?', [datoGuardar])
    return guardar.affectedRows > 0 ? guardar.insertId : -1
  }

  async guardarProyectoTabla(id_proyecto, id_tabla) {
    const nombreTablaGuardar = this.nombreTabla + '_proyecto'
    const columnaTablaGuardar = 'id_' + this.nombreTabla
    console.log(nombreTablaGuardar, columnaTablaGuardar, 'prueba')
    const queryGuardar = 'INSERT INTO ' + nombreTablaGuardar + ' (id_proyecto,' + columnaTablaGuardar + ') VALUES (?,?)'
    const guardar = await conexion.query(queryGuardar, [id_proyecto, id_tabla])
    return guardar.affectedRows > 0 ? guardar.insertId : -1
  }

  async verTodosProyectosPorIdRegistro(id) {
    const nombreTablaConsultar = this.nombreTabla + '_proyecto'
    const columnaTablaConsultar = 'id_' + this.nombreTabla
    const datos = await conexion.query('SELECT p.id, p.codigo, p.descripcion, p.certificacion, p.nombre_empresa, p.nit_empresa, p.fecha, p.estado FROM ' + nombreTablaConsultar + ' INNER JOIN proyecto p ON p.id = id_proyecto WHERE ' + columnaTablaConsultar + '=?', [id])
    return datos
  }

  async yaExisteProyecto(codigo) {
    const yaExiste = await conexion.query('SELECT codigo FROM ' + nombreTablaGeneral + ' WHERE codigo=?', [codigo])
    console.log(yaExiste, 'existe proyecto')
    return yaExiste.length > 0
  }

  async verInfoPrincipal() {
    const datos = await conexion.query("SELECT codigo, descripcion, id FROM " + nombreTablaGeneral)
    return datos
  }

  async yaExisteProyectoEnElemento(codigo, id) {
    const nombreTablaConsultar = this.nombreTabla + '_proyecto'
    const columnaTablaConsultar = 'id_' + this.nombreTabla
    console.log(codigo, id)
    const query = 'SELECT p.codigo FROM ' + nombreTablaGeneral + ' p INNER JOIN ' + nombreTablaConsultar + ' b ON p.id=b.id_proyecto WHERE p.codigo=? AND b.' + columnaTablaConsultar + '=?'
    console.log(query)
    const yaExiste = await conexion.query(query, [codigo, id])
    console.log(yaExiste, 'existe')
    return yaExiste.length > 0
  }

  async verIdProyectoPorCodigo(codigo) {
    const datos = await conexion.query('SELECT id FROM ' + nombreTablaGeneral + ' WHERE codigo=?', [codigo])
    return datos[0].id
  }

  async verInfo(id_proyecto) {
    console.log(id_proyecto, 'ver infoooo')
    const datos = await conexion.query('SELECT id, codigo, descripcion, certificacion, nombre_empresa, nit_empresa, fecha, estado FROM ' + nombreTablaGeneral + ' WHERE id=?', [id_proyecto])
    return datos[0]
  }

  async actualizar(dato) {
    console.log(dato, 'd')
    const generarQueryActualizarDB = new GenerarQueryActualizarDB(dato, nombreTablaGeneral, idPropiedad, Proyecto)
    const consulta = await generarQueryActualizarDB.consultaGenerada()
    const valores = await generarQueryActualizarDB.valoresGenerados()
    console.log(consulta)
    console.log(valores)
    try {
      const resultado = await conexion.query(consulta, valores);
      return resultado.affectedRows > 0;
    } catch (error) {
      console.error('Error al actualizar:', error);
    }
    return false
  }

  async eliminarProyecto(id_proyecto) {
    console.log(id_proyecto, 'ideli')
    const eliminar = await conexion.query('DELETE FROM ' + nombreTablaGeneral + ' WHERE id=?', [id_proyecto]);
    return eliminar.affectedRows > 0
  }

  async eliminarProyectoTabla(id_proyecto, id_registro_tabla) {
    const nombreTablaEliminar = this.nombreTabla + '_proyecto'
    const columnaTablaEliminar = 'id_' + this.nombreTabla
    const queryEliminar = 'DELETE FROM ' + nombreTablaEliminar + " WHERE id_proyecto=" + id_proyecto + " AND " + columnaTablaEliminar + "=" + id_registro_tabla
    console.log(queryEliminar);
    const eliminar = await conexion.query(queryEliminar);
    return eliminar.affectedRows > 0
  }

}

module.exports = ProyectoDAO