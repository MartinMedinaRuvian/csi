const Archivo = require('../modelo/Archivo')
const conexion = require('../util/conexion_mysql')

let nombreTablaGeneral = 'archivo'

class ArchivoDAO {

  nombreTabla

  constructor(nombre_tabla) {
    this.nombreTabla = nombre_tabla
  }

  async guardarArchivo(dato) {
    const { nombre, ruta, fecha_creacion } = dato
    const datoGuardar = new Archivo(nombre, ruta, fecha_creacion, null)
    const guardar = await conexion.query('INSERT INTO ' + nombreTablaGeneral + ' SET ?', [datoGuardar])
    return guardar.affectedRows > 0 ? guardar.insertId : -1
  }

  async guardarArchivoTabla(id_archivo, id_tabla) {
    const nombreTablaGuardar = this.nombreTabla + '_archivo'
    const columnaTablaGuardar = 'id_' + this.nombreTabla
    const queryGuardar = 'INSERT INTO ' + nombreTablaGuardar + ' (id_archivo,' + columnaTablaGuardar + ') VALUES (?,?)' 
    const guardar = await conexion.query(queryGuardar, [id_archivo, id_tabla])
    return guardar.affectedRows > 0 ? guardar.insertId : -1
  }

  async verInfoArchivo(id_archivo) {
    const datos = await conexion.query('SELECT nombre, ruta FROM ' + nombreTablaGeneral + ' WHERE id=?', [id_archivo])
    return datos[0]
}

  async eliminarArchivo(id_archivo) {
    console.log(id_archivo, 'ideli')
    const eliminar = await conexion.query('DELETE FROM ' + nombreTablaGeneral + ' WHERE id=?', [id_archivo]);
    return eliminar.affectedRows > 0
  }

  async eliminarArchivoTabla(id_archivo, id_registro_tabla) {
    const nombreTablaEliminar = this.nombreTabla + '_archivo'
    const columnaTablaEliminar = 'id_' + this.nombreTabla
    const queryEliminar = 'DELETE FROM ' + nombreTablaEliminar + " WHERE id_archivo=" + id_archivo + " AND " +  columnaTablaEliminar + "=" + id_registro_tabla
    console.log(queryEliminar);
    const eliminar = await conexion.query(queryEliminar);
    return eliminar.affectedRows > 0
  }

}

module.exports = ArchivoDAO