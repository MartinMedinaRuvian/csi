const CentroCableado = require('../modelo/CentroCableado')
const conexion = require('../util/conexion_mysql')
const GenerarQueryActualizarDB = require('../util/generar_query_actualizar_db')

const numeroTabla = 'centro_cableado'
const idPropiedad = 'id'

class CentroCableadoDAO {

    async obtenerTodos() {
        const datos = await conexion.query("SELECT * FROM " + numeroTabla + " WHERE estado='A'" + " ORDER BY " + idPropiedad + " DESC")
        return datos
    }

    async obtenerFiltrado(condicion, buscar) {
        const datos = await conexion.query('SELECT * FROM ' + numeroTabla + " WHERE " + condicion + " LIKE '%" + buscar + "%' AND estado='A'" + " ORDER BY " + idPropiedad + " DESC")
        return datos
    }

    async verPorIdEdificio(id_edificio) {
        const datos = await conexion.query('SELECT * FROM ' + numeroTabla + ' WHERE id_edificio=?' + "AND estado=0" + " ORDER BY numero DESC", [id_edificio])
        return datos
    }

    async verInfo(id) {
        const datos = await conexion.query('SELECT * FROM ' + numeroTabla + ' WHERE ' + idPropiedad + '=?', [id])
        return datos[0]
    }

    async yaExiste(numero, id_edificio) {
        const yaExiste = await conexion.query('SELECT id FROM ' + numeroTabla + ' WHERE numero=? AND id_edificio=?', [numero, id_edificio])
        return yaExiste.length > 0
    }

    async guardar(dato) {
        const { numero, tipo, ubicacion, ruta_imagen, observacion, climatizado, camaras, acceso_llaves, acceso_biometrico, fecha_creacion, estado, id_edificio } = dato
        const datoGuardar = new CentroCableado(numero, tipo, ubicacion, ruta_imagen, observacion, climatizado, camaras, acceso_llaves, acceso_biometrico, fecha_creacion, null, estado, id_edificio)
        const guardar = await conexion.query('INSERT INTO ' + numeroTabla + ' SET ?', [datoGuardar])
        return guardar.affectedRows > 0 ? guardar.insertId : -1
    }

    async cambiarEstado(estado, id) {
        const cambiar = await conexion.query('UPDATE ' + numeroTabla + ' SET estado=? WHERE ' + idPropiedad + '=?', [estado, id])
        return cambiar.affectedRows > 0
    }    
    
    async actualizar(dato) {
        console.log(dato, 'd')
        const generarQueryActualizarDB = new GenerarQueryActualizarDB(dato, numeroTabla, idPropiedad, CentroCableado)
        const consulta = await generarQueryActualizarDB.consultaGenerada()
        const valores = await generarQueryActualizarDB.valoresGenerados()
        try {
            const resultado = await conexion.query(consulta, valores);
            return resultado.affectedRows > 0;
        } catch (error) {
            console.error('Error al actualizar:', error);
        }
        return false
    }
    
    async eliminar(id) {
        const eliminar = await conexion.query('DELETE FROM ' + numeroTabla + ' WHERE ' + idPropiedad + '=?', [id]);
        return eliminar.affectedRows > 0
    }

}

module.exports = CentroCableadoDAO