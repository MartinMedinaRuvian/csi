class ElementoActivo {

  id
  descripcion
  codigo
  observacion
  codigo_inventario
  id_tipo_referencia
  id_tipo_modelo
  id_tipo_marca
  serial
  os
  version_os
  mac
  gateway
  ip_v4
  ip_v6
  cantidad_puertos_por_defecto
  puerto_logico_por_defecto
  puerto_fisico_por_defecto
  ruta_imagen
  fecha_creacion
  fecha_actualizacion
  estado
  id_gabinete
  id_usuario

  constructor(
    descripcion,
    codigo,
    observacion,
    codigo_inventario,
    id_tipo_referencia,
    id_tipo_modelo,
    id_tipo_marca,
    serial,
    os,
    version_os,
    mac,
    gateway,
    ip_v4,
    ip_v6,
    cantidad_puertos_por_defecto,
    puerto_logico_por_defecto,
    puerto_fisico_por_defecto,
    ruta_imagen,
    fecha_creacion,
    fecha_actualizacion,
    estado,
    id_gabinete,
    id_usuario
  ) {
    this.descripcion = descripcion;
    this.codigo = codigo;
    this.observacion = observacion;
    this.codigo_inventario = codigo_inventario;
    this.id_tipo_referencia = id_tipo_referencia;
    this.id_tipo_modelo = id_tipo_modelo;
    this.id_tipo_marca = id_tipo_marca;
    this.serial = serial;
    this.os = os;
    this.version_os = version_os;
    this.mac = mac;
    this.gateway = gateway;
    this.ip_v4 = ip_v4;
    this.ip_v6 = ip_v6;
    this.cantidad_puertos_por_defecto = cantidad_puertos_por_defecto;
    this.puerto_logico_por_defecto = puerto_logico_por_defecto;
    this.puerto_fisico_por_defecto = puerto_fisico_por_defecto;
    this.ruta_imagen = ruta_imagen;
    this.fecha_creacion = fecha_creacion;
    this.fecha_actualizacion = fecha_actualizacion;
    this.estado = estado;
    this.id_gabinete = id_gabinete;
    this.id_usuario = id_usuario;
  }

}

module.exports = ElementoActivo;