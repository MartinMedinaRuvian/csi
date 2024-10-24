class Elemento {

  id
  nombre
  id_tipo_elemento
  id_tipo_dispositivo
  referencia
  serial
  modelo
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
      this.nombre = elemento.nombre
      this.id_tipo_elemento = elemento.id_tipo_elemento
      this.id_tipo_dispositivo = elemento.id_tipo_dispositivo
      this.referencia = elemento.referencia
      this.serial = elemento.serial
      this.modelo = elemento.modelo
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