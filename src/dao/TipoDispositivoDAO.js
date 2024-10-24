const TipoDispositivo = require('../modelo/TipoDispositivo')
const conexion = require('../util/conexion_mysql')

const nombreTabla = 'tipo_dispositivo'
const idPropiedad = 'id'

class TipoDispositivoDAO {

    async obtenerTodos() {
        const datos = await conexion.query('SELECT * FROM ' + nombreTabla)
        return datos
    }

    async verPorId(id) {
        const datos = await conexion.query('SELECT * FROM ' + nombreTabla + ' WHERE ' + idPropiedad + '=' + id)
        return datos[0]
    }

    async yaExiste(descripcion) {
        const yaExiste = await conexion.query('SELECT descripcion FROM ' + nombreTabla + ' WHERE descripcion=?', [descripcion])
        return yaExiste.length > 0
    }

    async guardar(dato) {
        const { descripcion, fecha_creacion, estado } = dato
        const datoGuardar = new TipoDispositivo(descripcion.toUpperCase(), fecha_creacion, null, estado)
        const guardar = await conexion.query('INSERT INTO ' + nombreTabla + ' SET ?', [datoGuardar])
        return guardar.affectedRows > 0 ? guardar.insertId : -1
    }

    async cambiarEstado(estado, id) {
        const cambiar = await conexion.query('UPDATE ' + nombreTabla + ' SET estado=? WHERE ' + idPropiedad + '=?', [estado, id])
        return cambiar.affectedRows > 0
    }    
    
    async actualizar(dato) {
        console.log(dato)
        const generarQueryActualizarDB = new GenerarQueryActualizarDB(dato, nombreTabla, idPropiedad, TipoDispositivo)
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

module.exports = TipoDispositivoDAO