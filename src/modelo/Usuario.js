class Usuario {

  id
  password
  nombre_completo
  email
  estado
  rol_id
  fecha_creacion
  
  constructor (password, nombre_completo, email, estado, rol_id, fecha_creacion) {
      this.password = password
      this.nombre_completo = nombre_completo
      this.email = email
      this.estado = estado
      this.rol_id = rol_id,
      this.fecha_creacion = fecha_creacion
  }
  
}

module.exports= Usuario;