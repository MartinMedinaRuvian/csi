class Edificio {

  id
  nombre
  codigo
  ubicacion_mapa
  ruta_imagen
  observacion
  fecha_creacion
  fecha_actualizacion
  estado
  
  constructor (nombre, codigo, ubicacion_mapa, ruta_imagen, observacion, fecha_creacion, fecha_actualizacion, estado) {
      this.nombre = nombre
      this.codigo = codigo
      this.ubicacion_mapa = ubicacion_mapa
      this.ruta_imagen = ruta_imagen
      this.observacion = observacion
      this.fecha_creacion = fecha_creacion
      this.fecha_actualizacion = fecha_actualizacion
      this.estado = estado
  }
  
}

module.exports= Edificio;