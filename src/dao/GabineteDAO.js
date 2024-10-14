const Gabinete = require('../modelo/Gabinete')
const conexion = require('../util/conexion_mysql')
const GenerarQueryActualizarDB = require('../util/generar_query_actualizar_db')

const numeroTabla = 'gabinete'
const idPropiedad = 'id'

class GabineteDAO {

    async obtenerTodos() {
        const datos = await conexion.query("SELECT * FROM " + numeroTabla + " WHERE estado='A'" + " ORDER BY " + idPropiedad + " DESC")
        return datos
    }

    async obtenerFiltrado(condicion, buscar) {
        const datos = await conexion.query('SELECT * FROM ' + numeroTabla + " WHERE " + condicion + " LIKE '%" + buscar + "%' AND estado='A'" + " ORDER BY " + idPropiedad + " DESC")
        return datos
    }

    async verPorIdCentroCableado(id_centro_cableado) {
        const datos = await conexion.query('SELECT * FROM ' + numeroTabla + ' WHERE id_centro_cableado=?' + "AND estado='A'" + " ORDER BY numero DESC", [id_centro_cableado])
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
        const { numero, tipo, tamanio, ruta_imagen, observacion, aterrizado, fecha_creacion, estado, id_centro_cableado } = dato
        const datoGuardar = new Gabinete(numero, tipo, tamanio, ruta_imagen, observacion, aterrizado, fecha_creacion, null, estado, id_centro_cableado)
        const guardar = await conexion.query('INSERT INTO ' + numeroTabla + ' SET ?', [datoGuardar])
        return guardar.affectedRows > 0 ? guardar.insertId : -1
    }

    async cambiarEstado(estado, id) {
        const cambiar = await conexion.query('UPDATE ' + numeroTabla + ' SET estado=? WHERE ' + idPropiedad + '=?', [estado, id])
        return cambiar.affectedRows > 0
    }    
    
    async actualizar(dato) {
        console.log(dato, 'd')
        const generarQueryActualizarDB = new GenerarQueryActualizarDB(dato, numeroTabla, idPropiedad, Gabinete)
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

module.exports = GabineteDAO