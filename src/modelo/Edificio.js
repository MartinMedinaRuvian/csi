class Edificio {

  id
  nombre
  ubicacion
  codigo
  ruta_imagen
  observacion
  fecha_creacion
  fecha_actualizacion
  estado
  
  constructor (nombre, ubicacion, codigo, ruta_imagen, observacion, fecha_creacion, fecha_actualizacion, estado) {
      this.nombre = nombre
      this.ubicacion = ubicacion
      this.codigo = codigo
      this.ruta_imagen = ruta_imagen
      this.observacion = observacion
      this.fecha_creacion = fecha_creacion
      this.fecha_actualizacion = fecha_actualizacion
      this.estado = estado
  }
  
}

module.exports= Edificio;