const Tipo = require('../modelo/Tipo')
const conexion = require('../util/conexion_mysql')

let nombreTabla = 'tipo_elemento'
const idPropiedad = 'id'

class TipoDAO {

    constructor(nombre_tabla){
        this.nombreTabla = nombre_tabla
    }

    async obtenerTodos() {
        console.log(nombreTabla)
        const datos = await conexion.query('SELECT * FROM ' + this.nombreTabla)
        return datos
    }

    async verPorId(id) {
        const datos = await conexion.query('SELECT * FROM ' + this.nombreTabla + ' WHERE ' + idPropiedad + '=' + id)
        return datos[0]
    }

    async yaExiste(descripcion) {
        const yaExiste = await conexion.query('SELECT descripcion FROM ' + this.nombreTabla + ' WHERE descripcion=?', [descripcion])
        return yaExiste.length > 0
    }

    async guardar(dato) {
        const { descripcion, fecha_creacion, estado } = dato
        const datoGuardar = new Tipo(descripcion.toUpperCase(), fecha_creacion, null, estado)
        const guardar = await conexion.query('INSERT INTO ' + this.nombreTabla + ' SET ?', [datoGuardar])
        return guardar.affectedRows > 0 ? guardar.insertId : -1
    }

    async cambiarEstado(estado, id) {
        const cambiar = await conexion.query('UPDATE ' + this.nombreTabla + ' SET estado=? WHERE ' + idPropiedad + '=?', [estado, id])
        return cambiar.affectedRows > 0
    }    
    
    async actualizar(dato) {
        console.log(dato)
        const generarQueryActualizarDB = new GenerarQueryActualizarDB(dato, this.nombreTabla, idPropiedad, Tipo)
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
        const eliminar = await conexion.query('DELETE FROM ' + this.nombreTabla + ' WHERE ' + idPropiedad + '=?', [id]);
        return eliminar.affectedRows > 0
    }
}

module.exports = TipoDAO