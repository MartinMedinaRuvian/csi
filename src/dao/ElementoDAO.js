const Elemento = require('../modelo/Elemento')
const conexion = require('../util/conexion_mysql')
const GenerarQueryActualizarDB = require('../util/generar_query_actualizar_db')

const nombreTabla = 'elemento'
const idPropiedad = 'id'

class ElementoDAO {

    async obtenerTodos() {
        const datos = await conexion.query("SELECT * FROM " + nombreTabla + " WHERE estado='A'" + " ORDER BY " + idPropiedad + " DESC")
        return datos
    }

    async obtenerFiltrado(condicion, buscar) {
        const datos = await conexion.query('SELECT * FROM ' + nombreTabla + " WHERE " + condicion + " LIKE '%" + buscar + "%' AND estado='A'" + " ORDER BY " + idPropiedad + " DESC")
        return datos
    }

    async verPorIdGabinete(id_gabinete) {
        const datos = await conexion.query('SELECT * FROM ' + nombreTabla + ' WHERE id_gabinete=?' + "AND estado='A'" + " ORDER BY id DESC", [id_gabinete])
        return datos
    }

    async verInfo(id) {
        const datos = await conexion.query('SELECT * FROM ' + nombreTabla + ' WHERE ' + idPropiedad + '=?', [id])
        return datos[0]
    }

    async yaExiste(serial, id_gabinete) {
        console.log(serial, id_gabinete, 'ya existe')
        const yaExiste = await conexion.query('SELECT serial FROM ' + nombreTabla + ' WHERE serial=? AND id_gabinete=?', [serial, id_gabinete])
        return yaExiste.length > 0
    }

    async guardar(dato) {
        const datoGuardar = new Elemento(dato)
        const guardar = await conexion.query('INSERT INTO ' + nombreTabla + ' SET ?', [datoGuardar])
        return guardar.affectedRows > 0 ? guardar.insertId : -1
    }

    async cambiarEstado(estado, id) {
        const cambiar = await conexion.query('UPDATE ' + nombreTabla + ' SET estado=? WHERE ' + idPropiedad + '=?', [estado, id])
        return cambiar.affectedRows > 0
    }    
    
    async actualizar(dato) {
        console.log(dato, 'd')
        const generarQueryActualizarDB = new GenerarQueryActualizarDB(dato, nombreTabla, idPropiedad, Elemento)
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
        const eliminar = await conexion.query('DELETE FROM ' + nombreTabla + ' WHERE ' + idPropiedad + '=?', [id]);
        return eliminar.affectedRows > 0
    }

}

module.exports = ElementoDAO