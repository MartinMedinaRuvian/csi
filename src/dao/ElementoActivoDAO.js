const Elemento = require('../modelo/ElementoActivo')
const conexion = require('../util/conexion_mysql')
const GenerarQueryActualizarDB = require('../util/generar_query_actualizar_db')

const nombreTabla = 'elemento_activo'
const idPropiedad = 'id'

class ElementoDAO {

    async obtenerTodos() {
        const datos = await conexion.query("SELECT * FROM " + nombreTabla + " WHERE estado='A'" + " ORDER BY codigo ASC")
        return datos
    }

    async obtenerFiltrado(condicion, buscar) {
        const datos = await conexion.query('SELECT * FROM ' + nombreTabla + " WHERE " + condicion + " LIKE '%" + buscar + "%' AND estado='A'" + " ORDER BY codigo ASC")
        return datos
    }

    async verInfoPrincipalPorIdGabinete(id_gabinete) {
        const datos = await conexion.query('SELECT e.id, e.descripcion, e.codigo, e.serial, e.estado, e.id_tipo_modelo, e.id_tipo_marca, tr.descripcion AS tipo_referencia, tm.descripcion AS tipo_modelo, tmr.descripcion AS tipo_marca FROM ' + nombreTabla + ' e INNER JOIN tipo_referencia tr ON tr.id = e.id_tipo_referencia INNER JOIN tipo_modelo tm ON tm.id = e.id_tipo_modelo INNER JOIN tipo_marca tmr ON tmr.id = e.id_tipo_marca WHERE e.id_gabinete=?' + " AND e.estado='A'" + " ORDER BY e.codigo ASC", [id_gabinete])
        return datos
    }

    async verPorIdGabinete(id_gabinete) {
        const datos = await conexion.query('SELECT e.id, e.descripcion, e.codigo, e.serial, e.observacion, e.codigo_inventario, e.estado, e.os, e.version_os, e.mac, e.gateway, e.ip_v4, e.ip_v6, e.cantidad_puertos_por_defecto, e.puerto_logico_por_defecto, e.puerto_fisico_por_defecto, e.ruta_imagen, e.fecha_creacion, e.fecha_actualizacion, e.id_gabinete, e.id_usuario, e.id_tipo_modelo, e.id_tipo_marca, tr.descripcion AS tipo_referencia, tm.descripcion AS tipo_modelo, tmr.descripcion AS tipo_marca FROM ' + nombreTabla + ' e INNER JOIN tipo_referencia tr ON tr.id = e.id_tipo_referencia INNER JOIN tipo_modelo tm ON tm.id = e.id_tipo_modelo INNER JOIN tipo_marca tmr ON tmr.id = e.id_tipo_marca WHERE e.id_gabinete=?' + " AND e.estado='A'" + " ORDER BY e.codigo ASC", [id_gabinete])
        return datos
    }

    async verInfo(id) {
        const datos = await conexion.query('SELECT e.id, e.descripcion, e.codigo, e.serial, e.observacion, e.codigo_inventario, e.estado, e.os, e.version_os, e.mac, e.gateway, e.ip_v4, e.ip_v6, e.cantidad_puertos_por_defecto, e.puerto_logico_por_defecto, e.puerto_fisico_por_defecto, e.ruta_imagen, e.fecha_creacion, e.fecha_actualizacion, e.id_gabinete, e.id_usuario, e.id_tipo_modelo, e.id_tipo_marca, e.id_tipo_referencia, tr.descripcion AS tipo_referencia, tm.descripcion AS tipo_modelo, tmr.descripcion AS tipo_marca FROM ' + nombreTabla + ' e INNER JOIN tipo_referencia tr ON tr.id = e.id_tipo_referencia INNER JOIN tipo_modelo tm ON tm.id = e.id_tipo_modelo INNER JOIN tipo_marca tmr ON tmr.id = e.id_tipo_marca WHERE e.id=?', [id])
        return datos[0]
    }

    async yaExiste(codigo, id_gabinete) {
        console.log(codigo, id_gabinete, 'ya existe')
        const yaExiste = await conexion.query('SELECT codigo FROM ' + nombreTabla + ' WHERE codigo=? AND id_gabinete=?', [codigo, id_gabinete])
        return yaExiste.length > 0
    }

    async guardar(dato) {
        const {
            descripcion,
            codigo,
            observacion,
            codigo_inventario,
            id_tipo_referencia,
            id_tipo_modelo,
            id_tipo_marca,
            serial,
            os,
            version_os,
            mac,
            gateway,
            ip_v4,
            ip_v6,
            cantidad_puertos_por_defecto,
            puerto_logico_por_defecto,
            puerto_fisico_por_defecto,
            ruta_imagen,
            fecha_creacion,
            fecha_actualizacion,
            estado,
            id_gabinete,
            id_usuario
        } = dato;

        const datoGuardar = new Elemento(
            descripcion,
            codigo,
            observacion,
            codigo_inventario,
            id_tipo_referencia,
            id_tipo_modelo,
            id_tipo_marca,
            serial,
            os,
            version_os,
            mac,
            gateway,
            ip_v4,
            ip_v6,
            cantidad_puertos_por_defecto,
            puerto_logico_por_defecto,
            puerto_fisico_por_defecto,
            ruta_imagen,
            fecha_creacion,
            fecha_actualizacion,
            estado,
            id_gabinete,
            id_usuario
        );
        const guardar = await conexion.query('INSERT INTO ' + nombreTabla + ' SET ?', [datoGuardar]);
        return guardar.affectedRows > 0 ? guardar.insertId : -1;
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