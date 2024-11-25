const Mantenimiento = require('../modelo/Mantenimiento')
const conexion = require('../util/conexion_mysql')
const GenerarQueryActualizarDB = require('../util/generar_query_actualizar_db')

let nombreTablaGeneral = 'mantenimiento'
const idPropiedad = 'id'

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

  async verTodosMantenimientosPorIdRegistroObtenerFiltrado(id, condicion, buscar, limite, offset) {
    const nombreTablaConsultar = this.nombreTabla + '_mantenimiento';
    const columnaTablaConsultar = 'id_' + this.nombreTabla;

    const query = `
        SELECT 
            m.id, m.codigo, m.observacion, m.realizado_por, m.fecha, m.estado 
        FROM ${nombreTablaConsultar} t
        INNER JOIN mantenimiento m
            ON m.id = id_mantenimiento
        WHERE 
            ${columnaTablaConsultar} = ? 
            AND ${condicion} LIKE ? 
        ORDER BY 
            m.id DESC 
        LIMIT ? OFFSET ?;
    `;

    const totalQuery = `
        SELECT 
            COUNT(*) AS total 
        FROM ${nombreTablaConsultar} t
        INNER JOIN mantenimiento m
            ON m.id = id_mantenimiento
        WHERE 
            ${columnaTablaConsultar} = ? 
            AND ${condicion} LIKE ?;
    `;

    const datos = await conexion.query(query, [id, `%${buscar}%`, limite, offset]);
    const totalResult = await conexion.query(totalQuery, [id, `%${buscar}%`]);

    return { datos, total: totalResult[0].total };
  }



  async verTodosMantenimientosPorIdRegistroEntreFechas(id, fechaInicial, fechaFinal, limite, offset) {
    const nombreTablaConsultar = this.nombreTabla + '_mantenimiento';
    const columnaTablaConsultar = 'id_' + this.nombreTabla;

    const query = `
      SELECT 
          m.id, m.codigo, m.observacion, m.realizado_por, m.fecha, m.estado 
      FROM ${nombreTablaConsultar} t
      INNER JOIN mantenimiento m
          ON m.id = id_mantenimiento
      WHERE 
          ${columnaTablaConsultar} = ? 
          AND m.fecha BETWEEN ? AND ?
      ORDER BY 
          m.id DESC 
      LIMIT ? OFFSET ?;
  `;

    const totalQuery = `
      SELECT 
          COUNT(*) AS total 
      FROM ${nombreTablaConsultar} t
      INNER JOIN mantenimiento m
          ON m.id = id_mantenimiento
      WHERE 
          ${columnaTablaConsultar} = ? 
          AND m.fecha BETWEEN ? AND ?;
  `;

    const datos = await conexion.query(query, [id, fechaInicial, fechaFinal, limite, offset]);
    const totalResult = await conexion.query(totalQuery, [id, fechaInicial, fechaFinal]);

    return { datos, total: totalResult[0].total };
  }



  async verTodosMantenimientosPorIdRegistroFiltroFechas(id, fechaInicial, fechaFinal, condicion, buscar, limite, offset) {
    const nombreTablaConsultar = this.nombreTabla + '_mantenimiento';
    const columnaTablaConsultar = 'id_' + this.nombreTabla;

    const query = `
      SELECT 
          m.id, m.codigo, m.observacion, m.realizado_por, m.fecha, m.estado 
      FROM ${nombreTablaConsultar} t
      INNER JOIN mantenimiento m
          ON m.id = id_mantenimiento
      WHERE 
          ${columnaTablaConsultar} = ? 
          AND m.fecha BETWEEN ? AND ? 
          AND ${condicion} LIKE ?
      ORDER BY m.id DESC 
      LIMIT ? OFFSET ?;
  `;

    const totalQuery = `
      SELECT 
          COUNT(*) AS total 
      FROM ${nombreTablaConsultar} t
      INNER JOIN mantenimiento m
          ON m.id = id_mantenimiento
      WHERE 
          ${columnaTablaConsultar} = ? 
          AND m.fecha BETWEEN ? AND ? 
          AND ${condicion} LIKE ?;
  `;

    const datos = await conexion.query(query, [id, fechaInicial, fechaFinal, `%${buscar}%`, limite, offset]);
    const totalResult = await conexion.query(totalQuery, [id, fechaInicial, fechaFinal, `%${buscar}%`]);

    return { datos, total: totalResult[0].total };
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

  async actualizar(dato) {
    console.log(dato, 'd')
    const generarQueryActualizarDB = new GenerarQueryActualizarDB(dato, nombreTablaGeneral, idPropiedad, Mantenimiento)
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