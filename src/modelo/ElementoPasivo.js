class ElementoPasivo {

  id
  descripcion
  codigo
  observacion
  codigo_inventario
  categoria
  numero_puertos
  tipo_conector
  ruta_imagen
  fecha_creacion
  fecha_actualizacion
  estado
  id_gabinete
  id_usuario
  
  constructor (elemento) {
      this.descripcion = elemento.descripcion
      this.codigo = elemento.codigo
      this.observacion = elemento.observacion
      this.codigo_inventario = elemento.codigo_inventario
      this.categoria = elemento.categoria
      this.numero_puertos = elemento.numero_puertos
      this.tipo_conector = elemento.tipo_conector
      this.ruta_imagen = elemento.ruta_imagen
      this.fecha_creacion = elemento.fecha_creacion
      this.fecha_actualizacion = elemento.fecha_actualizacion
      this.estado = elemento.estado
      this.id_gabinete = elemento.id_gabinete
      this.id_usuario = elemento.id_usuario
  }
  
}

module.exports= ElementoPasivo;