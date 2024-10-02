const CentroCableado = require('../modelo/CentroCableado')
const conexion = require('../util/conexion_mysql')
const GenerarQueryActualizarDB = require('../util/generar_query_actualizar_db')

const nombreTabla = 'centro_cableado'
const idPropiedad = 'id'

class CentroCableadoDAO {

    async obtenerTodos() {
        const datos = await conexion.query("SELECT * FROM " + nombreTabla + " WHERE estado='A'" + " ORDER BY " + idPropiedad + " DESC")
        return datos
    }

    async obtenerFiltrado(condicion, buscar) {
        const datos = await conexion.query('SELECT * FROM ' + nombreTabla + " WHERE " + condicion + " LIKE '%" + buscar + "%' AND estado=0" + " ORDER BY " + idPropiedad + " DESC")
        return datos
    }

    async verInfo(id) {
        const datos = await conexion.query('SELECT * FROM ' + nombreTabla + ' WHERE ' + idPropiedad + '=?', [id])
        return datos[0]
    }

    async verCentroCableadosPorCodigo(codigo) {
        const datos = await conexion.query('SELECT * FROM ' + nombreTabla + ' WHERE codigo=? AND estado = 0', [codigo])
        return datos
    }

    async yaExiste(codigo) {
        const yaExiste = await conexion.query('SELECT codigo FROM ' + nombreTabla + ' WHERE codigo=?', [codigo])
        return yaExiste.length > 0
    }

    async guardar(dato) {
        const { nombre, ubicacion, codigo, ruta_imagen, observacion, fecha_creacion, estado } = dato
        const datoGuardar = new CentroCableado(nombre.toUpperCase(), ubicacion, codigo.toUpperCase(), ruta_imagen, observacion, fecha_creacion, null, estado)
        const guardar = await conexion.query('INSERT INTO ' + nombreTabla + ' SET ?', [datoGuardar])
        return guardar.affectedRows > 0 ? guardar.insertId : -1
    }

    async cambiarEstado(estado, id) {
        const cambiar = await conexion.query('UPDATE ' + nombreTabla + ' SET estado=? WHERE ' + idPropiedad + '=?', [estado, id])
        return cambiar.affectedRows > 0
    }    
    
    async actualizar(dato) {
        const generarQueryActualizarDB = new GenerarQueryActualizarDB(dato, nombreTabla, idPropiedad, CentroCableado)
        const consulta = await generarQueryActualizarDB.consultaGenerada()
        const valores = await generarQueryActualizarDB.valoresGenerados()
        try {
            const resultado = await conexion.query(consulta, valores);
            return resultado.affectedRows > 0;
        } catch (error) {
            console.error('Error al actualizar:', error);
        }
    }
    
    async eliminar(id) {
        const eliminar = await conexion.query('DELETE FROM ' + nombreTabla + ' WHERE ' + idPropiedad + '=?', [id]);
        return eliminar.affectedRows > 0
    }

}

module.exports = CentroCableadoDAO