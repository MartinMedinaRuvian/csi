const conexion = require('../util/conexion_mysql')

const nombreTabla = 'log_historico'
const idPropiedad = 'id'

class LogDAO {

    async obtenerTodos() {
        const datos = await conexion.query("SELECT * FROM " + nombreTabla + " ORDER BY " + idPropiedad + " DESC")
        return datos
    }

    async obtenerFiltrado(condicion, buscar, limite, offset) {
        console.log(condicion, buscar, limite, offset)
        const datos = await conexion.query(`
            SELECT * 
            FROM ${nombreTabla} 
            WHERE ${condicion} LIKE '%${buscar}%' 
            ORDER BY ${idPropiedad} DESC 
            LIMIT ${limite} OFFSET ${offset}
        `);
        const total = await conexion.query(`
            SELECT COUNT(*) AS total 
            FROM ${nombreTabla} 
            WHERE ${condicion} LIKE '%${buscar}%'
        `);
        return { datos, total: total[0].total };
    }

    async obtenerEntreFechas(timestampInicial, timestampFinal, limite, offset) {
        console.log(timestampInicial, timestampFinal, limite, offset)
        const datos = await conexion.query(`
            SELECT * 
            FROM ${nombreTabla} 
            WHERE timestamp BETWEEN ? AND ? 
            ORDER BY timestamp DESC 
            LIMIT ? OFFSET ?
        `, [timestampInicial, timestampFinal, limite, offset]);

        const total = await conexion.query(`
            SELECT COUNT(*) AS total 
            FROM ${nombreTabla} 
            WHERE timestamp BETWEEN ? AND ?
        `, [timestampInicial, timestampFinal]);

        return { datos, total: total[0].total };
    }

    async obtenerFiltradoEntreFechas(condicion, buscar, timestampInicial, timestampFinal, limite, offset) {
        console.log(condicion, buscar, timestampInicial, timestampFinal, limite, offset)
        const datos = await conexion.query(`
            SELECT * 
            FROM ${nombreTabla} 
            WHERE ${condicion} LIKE ? 
              AND timestamp BETWEEN ? AND ?
            ORDER BY timestamp DESC 
            LIMIT ? OFFSET ?
        `, [`%${buscar}%`, timestampInicial, timestampFinal, limite, offset]);

        const total = await conexion.query(`
            SELECT COUNT(*) AS total 
            FROM ${nombreTabla} 
            WHERE ${condicion} LIKE ? 
              AND timestamp BETWEEN ? AND ?
        `, [`%${buscar}%`, timestampInicial, timestampFinal]);

        return { datos, total: total[0].total };
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