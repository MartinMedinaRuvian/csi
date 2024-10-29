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
  
  constructor(
    descripcion,
    codigo,
    observacion,
    codigo_inventario,
    categoria,
    numero_puertos,
    tipo_conector,
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
    this.categoria = categoria;
    this.numero_puertos = numero_puertos;
    this.tipo_conector = tipo_conector;
    this.ruta_imagen = ruta_imagen;
    this.fecha_creacion = fecha_creacion;
    this.fecha_actualizacion = fecha_actualizacion;
    this.estado = estado;
    this.id_gabinete = id_gabinete;
    this.id_usuario = id_usuario;
  }
  
}

module.exports= ElementoPasivo;