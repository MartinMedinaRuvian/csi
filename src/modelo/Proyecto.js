class Proyecto {

  id
  codigo
  descripcion
  certificacion
  nombre_empresa
  nit_empresa
  fecha
  fecha_creacion
  fecha_actualizacion
  estado

  constructor(codigo, descripcion, certificacion, nombre_empresa, nit_empresa, fecha, fecha_creacion, fecha_actualizacion, estado){
    this.codigo = codigo
    this.descripcion = descripcion
    this.certificacion = certificacion
    this.nombre_empresa = nombre_empresa
    this.nit_empresa = nit_empresa
    this.fecha = fecha
    this.fecha_creacion = fecha_creacion
    this.fecha_actualizacion = fecha_actualizacion
    this.estado = estado
  }

}

module.exports = Proyecto