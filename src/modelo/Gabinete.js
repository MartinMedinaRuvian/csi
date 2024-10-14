class Gabinete {

  id
  numero
  tamanio
  ruta_imagen
  observacion
  aterrizado
  fecha_creacion
  fecha_actualizacion
  estado
  id_centro_cableado
  id_tipo_gabinete

  constructor(numero, tamanio, ruta_imagen, observacion, aterrizado, fecha_creacion, fecha_actualizacion, estado, id_centro_cableado, id_tipo_gabinete) {
    this.numero = numero
    this.tamanio = tamanio
    this.ruta_imagen = ruta_imagen
    this.observacion = observacion
    this.aterrizado = aterrizado
    this.fecha_creacion = fecha_creacion
    this.fecha_actualizacion = fecha_actualizacion
    this.estado = estado
    this.id_centro_cableado = id_centro_cableado
    this.id_tipo_gabinete = id_tipo_gabinete
  }

}

module.exports = Gabinete;