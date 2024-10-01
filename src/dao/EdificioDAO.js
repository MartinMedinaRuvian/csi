const Edificio = require('../modelo/Edificio')
const conexion = require('../util/conexion_mysql')

const nombreTabla = 'edificio'

class EdificioDAO {

    async obtenerTodos() {
        const datos = await conexion.query("SELECT * FROM " + nombreTabla + " WHERE estado='A'" + " ORDER BY id DESC")
        return datos
    }

    async obtenerFiltrado(condicion, buscar) {
        const datos = await conexion.query('SELECT * FROM ' + nombreTabla + " WHERE " + condicion + " LIKE '%" + buscar + "%' AND estado=0 ORDER BY id DESC")
        return datos
    }

    async verInfo(id) {
        const datos = await conexion.query('SELECT * FROM ' + nombreTabla + ' WHERE id=?', [id])
        return datos[0]
    }

    async verEdificiosPorCodigo(codigo) {
        const datos = await conexion.query('SELECT * FROM ' + nombreTabla + ' WHERE codigo=? AND estado = 0', [codigo])
        return datos
    }

    async yaExiste(codigo) {
        const yaExiste = await conexion.query('SELECT codigo FROM ' + nombreTabla + ' WHERE codigo=?', [codigo])
        return yaExiste.length > 0
    }

    async guardar(dato) {
        const { nombre, ubicacion, codigo, ruta_imagen, observacion, fecha_creacion, estado } = dato
        const datoGuardar = new Edificio(nombre.toUpperCase(), ubicacion, codigo.toUpperCase(), ruta_imagen, observacion, fecha_creacion, null, estado)
        const guardar = await conexion.query('INSERT INTO ' + nombreTabla + ' SET ?', [datoGuardar])
        return guardar.affectedRows > 0 ? guardar.insertId : -1
    }

    async cambiarEstado(estado, id) {
        const cambiar = await conexion.query('UPDATE ' + nombreTabla + ' SET estado=? WHERE id=?', [estado, id])
        return cambiar.affectedRows > 0
    }

    async actualizar(id, datos) {
        datos.nombre = datos.nombre.toUpperCase()
        datos.codigo = datos.codigo.toUpperCase()
        const actualizar = await conexion.query('UPDATE ' + nombreTabla + ' SET ? WHERE id=?', [datos, id])
        return actualizar.affectedRows > 0
    }

    async eliminar(id) {
        const eliminar = await conexion.query('DELETE FROM ' + nombreTabla + ' WHERE id=?', [id]);
        return eliminar.affectedRows > 0
    }

}

module.exports = EdificioDAO