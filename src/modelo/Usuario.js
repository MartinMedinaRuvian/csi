class Usuario {

  id
  password
  nombre_completo
  email
  estado
  rol_id
  
  constructor (password, nombre_completo, email, estado, rol_id) {
      this.password = password
      this.nombre_completo = nombre_completo
      this.email = email
      this.estado = estado
      this.rol_id = rol_id
  }
  
}

module.exports= Usuario;