class CentroCableado {

  id
  numero
  ubicacion
  ruta_imagen
  observacion
  fecha_creacion
  fecha_actualizacion
  estado
  id_edificio

  constructor(numero, ubicacion, ruta_imagen, observacion, fecha_creacion, fecha_actualizacion, estado, id_edificio) {
    this.numero = numero
    this.ubicacion = ubicacion
    this.ruta_imagen = ruta_imagen
    this.observacion = observacion
    this.fecha_creacion = fecha_creacion
    this.fecha_actualizacion = fecha_actualizacion
    this.estado = estado
    this.id_edificio = id_edificio
  }

}

module.exports = CentroCableado;