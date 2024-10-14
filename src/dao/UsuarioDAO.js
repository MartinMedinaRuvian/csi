const Usuario = require('../modelo/Usuario')
const conexion = require('../util/conexion_mysql');
const GenerarQueryActualizarDB = require('../util/generar_query_actualizar_db')

const nombreTabla = 'usuario';
const idPropiedad = 'id'

class UsuarioDAO{

    async obtenerTodos(){
        const datos = await conexion.query('SELECT id, estado, email, nombre_completo, rol_id FROM ' + nombreTabla);
        return datos;
    }

    async obtenerFiltrado(condicion, buscar) {
        const datos = await conexion.query('SELECT * FROM ' + nombreTabla + " WHERE " + condicion + " LIKE '%" + buscar + "%'")
        return datos
    }

    async verInfo(id){
        const datos = await conexion.query('SELECT id, estado, email, nombre_completo, rol_id FROM ' + nombreTabla + ' WHERE id=?', [id])
        return datos[0]
    }

    async yaExiste(email){
        const yaExiste = await conexion.query('SELECT email FROM ' + nombreTabla + ' WHERE email=?', [email]);       
        return yaExiste.length > 0
    }

    async guardar(datos){
        const {password, nombre_completo, email, estado, rol_id} = datos;
        const datoGuardar = new Usuario(password, nombre_completo.toUpperCase(), email, estado, rol_id);
        const guardar = await conexion.query('INSERT INTO ' + nombreTabla + ' SET ?', [datoGuardar]);
        return guardar.affectedRows > 0 ? guardar.insertId : -1;
    }

    async verificarUsuario(email){
        const dato = await conexion.query('SELECT * FROM ' + nombreTabla + ' WHERE email=? limit 1', [email]);
        return dato.length > 0 ? dato : [];
    }

    async verificarUsuarioPorid(id){
        const dato = await conexion.query('SELECT * FROM ' + nombreTabla + ' WHERE id=?', [id]);
        return dato.length > 0 ? dato : [];
    }

    async actualizar(dato){
        console.log(dato)
        const generarQueryActualizarDB = new GenerarQueryActualizarDB(dato, nombreTabla, idPropiedad, Usuario)
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

    async cambiarPassword(id, datos){
        const { password } = datos
        const actualizar = await conexion.query('UPDATE ' + nombreTabla + ' SET password=? WHERE ' + idPropiedad + '=?', [password, id])
        return actualizar.affectedRows > 0
    }

    async cambiarEstado(estado, id){      
        const cambiar = await conexion.query('UPDATE ' + nombreTabla + ' SET estado=? WHERE ' + idPropiedad + '=?', [estado, id])
        return cambiar.affectedRows > 0
    }

    async eliminar(id){  
        console.log(id, 'eliminar')
        const eliminar = await conexion.query('DELETE FROM ' + nombreTabla + ' WHERE ' + idPropiedad + '=?', [id]);
        return eliminar.affectedRows > 0
    }
}

module.exports= UsuarioDAO;