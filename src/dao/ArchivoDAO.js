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
    console.log(dato, 'datoo')
    const datoGuardar = new Archivo(nombre.toUpperCase(), ruta, fecha_creacion, null)
    const guardar = await conexion.query('INSERT INTO ' + nombreTablaGeneral + ' SET ?', [datoGuardar])
    console.log(guardar, 'guardar')
    return guardar.affectedRows > 0 ? guardar.insertId : -1
  }

  async guardarArchivoTabla(id_archivo, id_tabla) {
    const nombreTablaGuardar = this.nombreTabla + '_archivo'
    const columnaTablaGuardar = 'id_' + this.nombreTabla
    const queryGuardar = 'INSERT INTO ' + nombreTablaGuardar + ' (id_archivo,' + columnaTablaGuardar + ') VALUES (?,?)' 
    const guardar = await conexion.query(queryGuardar, [id_archivo, id_tabla])
    return guardar.affectedRows > 0 ? guardar.insertId : -1
  }

  async eliminar(id) {
    const eliminar = await conexion.query('DELETE FROM ' + nombreTabla + ' WHERE id=?', [id]);
    return eliminar.affectedRows > 0
  }

}

module.exports = ArchivoDAO