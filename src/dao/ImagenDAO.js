const conexion = require('../util/conexion_mysql')

class ImagenDAO {

  nombreTabla

  constructor(nombre_tabla) {
    this.nombreTabla = nombre_tabla
  }

  async actualizarImagen(id, ruta_imagen) {
    const actualizar = await conexion.query('UPDATE ' + this.nombreTabla + ' SET ruta_imagen=? WHERE id=?', [ruta_imagen, id])
    return actualizar.affectedRows > 0
  }

}

module.exports = ImagenDAO