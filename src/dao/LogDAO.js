const conexion = require('../util/conexion_mysql')

const nombreTabla = 'log_historico'
const idPropiedad = 'id'

class LogDAO {

    async obtenerTodos() {
        const datos = await conexion.query("SELECT * FROM " + nombreTabla + " ORDER BY " + idPropiedad + " DESC")
        return datos
    }

    async obtenerFiltrado(condicion, buscar, limite, offset) {
        // Consulta principal con paginación
        const query = `
            SELECT 
                * 
            FROM 
                ${nombreTabla} 
            WHERE 
                ${condicion} LIKE ? 
            ORDER BY 
                ${idPropiedad} DESC 
            LIMIT ? OFFSET ?;
        `;
    
        // Consulta para calcular el total de filas
        const totalQuery = `
            SELECT 
                COUNT(*) AS total 
            FROM 
                ${nombreTabla} 
            WHERE 
                ${condicion} LIKE ?;
        `;
    
        // Ejecutar consultas
        const datos = await conexion.query(query, [`%${buscar}%`, limite, offset]);
        const totalResult = await conexion.query(totalQuery, [`%${buscar}%`]);
    
        // Retornar los datos y el total de filas
        return { datos, total: totalResult[0].total };
    }
    

    async obtenerEntreFechas(timestampInicial, timestampFinal, limite, offset) {
        console.log(timestampInicial, timestampFinal, limite, offset);
    
        // Consulta principal con paginación
        const query = `
            SELECT 
                * 
            FROM 
                ${nombreTabla} 
            WHERE 
                timestamp BETWEEN ? AND ? 
            ORDER BY 
                timestamp DESC 
            LIMIT ? OFFSET ?;
        `;
    
        // Consulta para calcular el total de filas
        const totalQuery = `
            SELECT 
                COUNT(*) AS total 
            FROM 
                ${nombreTabla} 
            WHERE 
                timestamp BETWEEN ? AND ?;
        `;
    
        // Ejecutar consultas
        const datos = await conexion.query(query, [timestampInicial, timestampFinal, limite, offset]);
        const totalResult = await conexion.query(totalQuery, [timestampInicial, timestampFinal]);
    
        // Retornar los datos y el total de filas
        return { datos, total: totalResult[0].total };
    }
    
    

    async obtenerFiltradoEntreFechas(condicion, buscar, timestampInicial, timestampFinal, limite, offset) {
        console.log(condicion, buscar, timestampInicial, timestampFinal, limite, offset);
    
        // Consulta principal con paginación
        const query = `
            SELECT 
                * 
            FROM 
                ${nombreTabla} 
            WHERE 
                ${condicion} LIKE ? 
                AND timestamp BETWEEN ? AND ? 
            ORDER BY 
                timestamp DESC 
            LIMIT ? OFFSET ?;
        `;
    
        // Consulta para calcular el total de filas
        const totalQuery = `
            SELECT 
                COUNT(*) AS total 
            FROM 
                ${nombreTabla} 
            WHERE 
                ${condicion} LIKE ? 
                AND timestamp BETWEEN ? AND ?;
        `;
    
        // Ejecutar consultas
        const datos = await conexion.query(query, [`%${buscar}%`, timestampInicial, timestampFinal, limite, offset]);
        const totalResult = await conexion.query(totalQuery, [`%${buscar}%`, timestampInicial, timestampFinal]);
    
        // Retornar los datos y el total de filas
        return { datos, total: totalResult[0].total };
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