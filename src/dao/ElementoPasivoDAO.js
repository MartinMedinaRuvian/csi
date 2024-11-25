const ElementoPasivo = require('../modelo/ElementoPasivo')
const Elemento = require('../modelo/ElementoPasivo')
const conexion = require('../util/conexion_mysql')
const GenerarQueryActualizarDB = require('../util/generar_query_actualizar_db')

const nombreTabla = 'elemento_pasivo'
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
        const datos = await conexion.query('SELECT e.id, e.codigo, e.estado, e.id_tipo_dispositivo_pasivo, td.descripcion AS tipo_dispositivo FROM ' + nombreTabla + ' e INNER JOIN tipo_dispositivo_pasivo td ON td.id = e.id_tipo_dispositivo_pasivo WHERE e.id_gabinete=?' + " AND e.estado='A'" + " ORDER BY e.codigo ASC", [id_gabinete])
        return datos
    }

    async verPorIdGabinete(id_gabinete, condicion, buscar) {
        const query = `
    SELECT 
        e.id, e.codigo, e.observacion, e.codigo_inventario, e.categoria, 
        e.numero_puertos, e.tipo_conector, e.ruta_imagen, e.fecha_creacion, 
        e.fecha_actualizacion, e.estado, e.id_gabinete, e.id_usuario, 
        e.id_tipo_dispositivo_pasivo, 
        td.descripcion AS tipo_dispositivo
    FROM ${nombreTabla} e
    INNER JOIN tipo_dispositivo_pasivo td 
        ON td.id = e.id_tipo_dispositivo_pasivo
    WHERE 
        e.id_gabinete = ? 
        AND e.estado = 'A' 
        AND ${condicion} LIKE ?
    ORDER BY e.codigo ASC
    `;

        const values = [id_gabinete, `%${buscar}%`];
        const datos = await conexion.query(query, values)
        return datos
    }

    async verInfo(id) {
        const datos = await conexion.query('SELECT e.id, e.codigo, e.observacion, e.codigo_inventario, e.categoria, e.numero_puertos, e.tipo_conector, e.ruta_imagen, e.fecha_creacion, e.fecha_actualizacion, e.estado, e.id_gabinete, e.id_usuario, e.id_tipo_dispositivo_pasivo, td.descripcion AS tipo_dispositivo FROM ' + nombreTabla + ' e INNER JOIN tipo_dispositivo_pasivo td ON td.id = e.id_tipo_dispositivo_pasivo WHERE e.id=?', [id])
        return datos[0]
    }

    async verInfoExistente(id) {
        const datos = await conexion.query('SELECT codigo FROM ' + nombreTabla + ' WHERE id=?', [id])
        return datos[0]
    }

    async yaExiste(codigo, id_gabinete) {
        console.log(codigo, id_gabinete, 'ya existe')
        const yaExiste = await conexion.query('SELECT codigo FROM ' + nombreTabla + ' WHERE codigo=? AND id_gabinete=?', [codigo, id_gabinete])
        return yaExiste.length > 0
    }

    async guardar(dato) {
        const {
            id_tipo_dispositivo_pasivo,
            codigo,
            observacion,
            codigo_inventario,
            categoria,
            numero_puertos,
            tipo_conector,
            ruta_imagen,
            fecha_creacion,
            fecha_actualizacion,
            estado,
            id_gabinete,
            id_usuario
        } = dato;
        const datoGuardar = new Elemento(
            id_tipo_dispositivo_pasivo,
            codigo,
            observacion,
            codigo_inventario,
            categoria,
            numero_puertos,
            tipo_conector,
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
        const generarQueryActualizarDB = new GenerarQueryActualizarDB(dato, nombreTabla, idPropiedad, ElementoPasivo)
        const consulta = await generarQueryActualizarDB.consultaGenerada()
        const valores = await generarQueryActualizarDB.valoresGenerados()
        console.log(consulta, valores)
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