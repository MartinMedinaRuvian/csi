class Tipo {

  id
  descripcion
  fecha_creacion
  fecha_actualizacion
  estado

  constructor(descripcion, fecha_creacion, fecha_actualizacion, estado) {
    this.descripcion = descripcion
    this.fecha_creacion = fecha_creacion
    this.fecha_actualizacion = fecha_actualizacion
    this.estado = estado
  }

}

module.exports = Tipo;