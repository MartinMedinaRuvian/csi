const Usuario = require('../modelo/Usuario')
const conexion = require('../util/conexion_mysql');

const nombreTabla = 'usuario';

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
        const dato = await conexion.query('SELECT * FROM ' + nombreTabla + ' WHERE email=?', [email]);
        return dato.length > 0 ? dato : [];
    }

    async verificarUsuarioPorid(id){
        const dato = await conexion.query('SELECT * FROM ' + nombreTabla + ' WHERE id=?', [id]);
        return dato.length > 0 ? dato : [];
    }

    async actualizar(id, datos){
        datos.nombre_completo = datos.nombre_completo.toUpperCase()
        const { nombre_completo, email, rol_id } = datos
        const actualizar = await conexion.query('UPDATE ' + nombreTabla + ' SET nombre_completo=?, email=?, rol_id=? WHERE id=?', [nombre_completo, email, rol_id, id])
        return actualizar.affectedRows > 0
    }

    async cambiarPassword(id, datos){
        const { password } = datos
        const actualizar = await conexion.query('UPDATE ' + nombreTabla + ' SET password=? WHERE id=?', [password, id])
        return actualizar.affectedRows > 0
    }

    async cambiarEstado(estado, id){      
        const cambiar = await conexion.query('UPDATE ' + nombreTabla + ' SET estado=? WHERE id=?', [estado, id])
        return cambiar.affectedRows > 0
    }

    async registroTieneVentaRegistrada (id) {
        const esta = await conexion.query('SELECT usuario_id FROM venta WHERE usuario_id=?', [id]);   
        return esta.length > 0
    }

    async eliminar(id){  
        const eliminar = await conexion.query('DELETE FROM ' + nombreTabla + ' WHERE id=?', [id]);
        return eliminar.affectedRows > 0
    }
}

module.exports= UsuarioDAO;