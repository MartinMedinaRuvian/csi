const conexion = require('../util/conexion_mysql')

const nombreTabla = 'log_historico'
const idPropiedad = 'id'

class LogDAO {

    async obtenerTodos() {
        const datos = await conexion.query("SELECT * FROM " + nombreTabla + " ORDER BY " + idPropiedad + " DESC")
        return datos
    }

    async obtenerFiltrado(condicion, buscar) {
        const datos = await conexion.query('SELECT * FROM ' + nombreTabla + " WHERE " + condicion + " LIKE '%" + buscar + "%' ORDER BY " + idPropiedad + " DESC")
        return datos
    }

    async obtenerEntreFechas(fechaInicial, fechaFinal){
        const datos = await conexion.query('SELECT * FROM ' + nombreTabla + " WHERE timestamp between '" + fechaInicial + "' and '" + fechaFinal + "' ORDER BY id desc")
        return datos
    }

    async obtenerFiltradoEntreFechas(condicion, buscar, fechaInicial, fechaFinal, limite){
        const datos = await conexion.query('SELECT * FROM ' + nombreTabla + " WHERE " + condicion + " LIKE '%"+ buscar + "%' AND timestamp between '" + fechaInicial + "' and '" + fechaFinal + "' ORDER BY id desc")
        return datos
    }

    async verInfo(id) {
        const datos = await conexion.query('SELECT * FROM ' + nombreTabla + ' WHERE ' + idPropiedad + '=?', [id])
        return datos[0]
    }

    async guardar(idUsuario, email, accion, observacion, ip) {
        console.log(idUsuario, accion, ip)
        const datoGuardar = {
            id_usuario: idUsuario,
            email_usuario: email,
            accion,
            observacion,
            ip_address: ip
        }
        const guardar = await conexion.query('INSERT INTO ' + nombreTabla + ' SET ?', [datoGuardar])
        return guardar.affectedRows > 0 ? guardar.insertId : -1
    }


}

module.exports = LogDAO