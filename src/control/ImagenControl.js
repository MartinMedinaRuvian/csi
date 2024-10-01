const DAO = require('../dao/ImagenDAO');

class ImagenControl {

  nombreTabla

  constructor(nombre_tabla){
    this.nombreTabla = nombre_tabla
  }

  async actualizarImagen(id, ruta_imagen) {
    try {
      const dao = new DAO(this.nombreTabla)
      if (await dao.actualizarImagen(id, ruta_imagen)) {
        return true
      }
        
    } catch (error) {
      console.log(error)
    }
    return false
  }


}

module.exports = ImagenControl