class Mantenimiento {

  id
  codigo
  observacion
  realizado_por
  fecha
  fecha_creacion
  fecha_actualizacion
  estado

  constructor(codigo, observacion, realizado_por, fecha, fecha_creacion, fecha_actualizacion, estado){
    this.codigo = codigo
    this.observacion = observacion
    this.realizado_por = realizado_por
    this.fecha = fecha
    this.fecha_creacion = fecha_creacion
    this.fecha_actualizacion = fecha_actualizacion
    this.estado = estado
  }

}

module.exports = Mantenimiento