const conexion = require('../util/conexion_mysql')

const nombreTabla = 'rol'

class RolDAO {

    async obtenerTodos() {
        const datos = await conexion.query('SELECT * FROM ' + nombreTabla)
        return datos
    }
}

module.exports = RolDAO