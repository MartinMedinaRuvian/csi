class Elemento {

  id
  descripcion
  id_tipo_elemento
  id_tipo_referencia
  codigo
  serial
  id_tipo_modelo
  id_tipo_marca
  observacion
  os
  version_os
  mac
  gateway
  ip_v4
  ip_v6
  cantidad_puertos_por_defecto
  puerto_logico_por_defecto
  puerto_fisico_por_defecto
  codigo_inventario
  ruta_imagen
  fecha_creacion
  fecha_actualizacion
  estado
  id_gabinete
  id_usuario
  
  constructor (elemento) {
      this.id_tipo_elemento = elemento.id_tipo_elemento
      this.descripcion = elemento.descripcion
      this.id_tipo_referencia = elemento.id_tipo_referencia
      this.codigo = elemento.codigo
      this.serial = elemento.serial
      this.id_tipo_modelo = elemento.id_tipo_modelo
      this.id_tipo_marca = elemento.id_tipo_marca
      this.observacion = elemento.observacion
      this.os = elemento.os
      this.version_os = elemento.version_os
      this.mac = elemento.mac
      this.gateway = elemento.gateway
      this.ip_v4 = elemento.ip_v4
      this.ip_v6 = elemento.ip_v6
      this.cantidad_puertos_por_defecto = elemento.cantidad_puertos_por_defecto
      this.puerto_logico_por_defecto = elemento.puerto_logico_por_defecto
      this.puerto_fisico_por_defecto = elemento.puerto_fisico_por_defecto
      this.codigo_inventario = elemento.codigo_inventario
      this.ruta_imagen = elemento.ruta_imagen
      this.fecha_creacion = elemento.fecha_creacion
      this.fecha_actualizacion = elemento.fecha_actualizacion
      this.estado = elemento.estado
      this.id_gabinete = elemento.id_gabinete
      this.id_usuario = elemento.id_usuario
  }
  
}

module.exports= Elemento;