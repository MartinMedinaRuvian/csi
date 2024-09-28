class Edificio {

  id
  nombre
  ruta_imagen
  observacion
  ubicacion
  fecha_creacion
  fecha_actualizacion
  estado
  usuario_id

  constructor(nombre, ruta_imagen, observacion, ubicacion, fecha_creacion, fecha_actualizacion, estado, usuario_id) {
    this.nombre = nombre
    this.ubicacion = ubicacion
    this.ruta_imagen = ruta_imagen
    this.observacion = observacion
    this.fecha_creacion = fecha_creacion
    this.fecha_actualizacion = fecha_actualizacion
    this.estado = estado
    this.usuario_id = usuario_id
  }

}

module.exports = Edificio;