class CentroCableado {

  id
  numero
  tipo
  ubicacion
  ruta_imagen
  observacion
  climatizado
  camaras
  acceso_llaves
  acceso_biometrico
  fecha_creacion
  fecha_actualizacion
  estado
  id_edificio

  constructor(numero, tipo, ubicacion, ruta_imagen, observacion, climatizado, camaras, acceso_llaves, acceso_biometrico, fecha_creacion, fecha_actualizacion, estado, id_edificio) {
    this.numero = numero
    this.tipo = tipo
    this.ubicacion = ubicacion
    this.ruta_imagen = ruta_imagen
    this.observacion = observacion
    this.climatizado = climatizado
    this.camaras = camaras
    this.acceso_llaves = acceso_llaves
    this.acceso_biometrico = acceso_biometrico
    this.fecha_creacion = fecha_creacion
    this.fecha_actualizacion = fecha_actualizacion
    this.estado = estado
    this.id_edificio = id_edificio
  }

}

module.exports = CentroCableado;