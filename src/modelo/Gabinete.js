class Gabinete {

  id
  numero
  tipo
  tamanio
  ruta_imagen
  observacion
  aterrizado
  fecha_creacion
  fecha_actualizacion
  estado
  id_centro_cableado

  constructor(numero, tipo, tamanio, ruta_imagen, observacion, aterrizado, fecha_creacion, fecha_actualizacion, estado, id_centro_cableado) {
    this.numero = numero
    this.tipo = tipo
    this.tamanio = tamanio
    this.ruta_imagen = ruta_imagen
    this.observacion = observacion
    this.aterrizado = aterrizado
    this.fecha_creacion = fecha_creacion
    this.fecha_actualizacion = fecha_actualizacion
    this.estado = estado
    this.id_centro_cableado = id_centro_cableado
  }

}

module.exports = Gabinete;