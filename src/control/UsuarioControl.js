const bcrypt = require('bcrypt');
const saltRounds = 10;
require("dotenv").config();

const DAO = require('../dao/UsuarioDAO');
const ValidacionPropiedadesObligatorias = require('../util/validar_propiedades');

class UsuarioControl {

  async verTodos() {
    const dao = new DAO();
    try {
      const datos = await dao.obtenerTodos();
      return {
        codigo: 200,
        respuesta: datos
      }
    } catch (error) {
      return {
        codigo: 500,
        respuesta: error
      }
    }
  }

  async verConFiltro(condicion, buscar) {
    try {
      const dao = new DAO()
      const datos = await dao.obtenerFiltrado(condicion, buscar)
      return {
        codigo: 200,
        respuesta: datos
      }
    } catch (error) {
      return {
        codigo: 500,
        respuesta: error
      }
    }
  }

  validarDatosObligatorios(dato, actualizar) {
    const datosObligatorios = actualizar ? ['nombre_completo', 'email'] : ['nombre_completo', 'email', 'password']
    const validarPropiedadesObligatorias = new ValidacionPropiedadesObligatorias()
    const validacionPropiedadObligatoria = validarPropiedadesObligatorias.validar(dato, datosObligatorios)
    return {
      codigo: validacionPropiedadObligatoria.codigo,
      respuesta: validacionPropiedadObligatoria.respuesta
    }
  }

  validarDatosObligatoriosCambiarPassword(dato) {
    const datosObligatorios = ['password_super_admin', 'password']
    const validarPropiedadesObligatorias = new ValidacionPropiedadesObligatorias()
    const validacionPropiedadObligatoria = validarPropiedadesObligatorias.validar(dato, datosObligatorios)
    return {
      codigo: validacionPropiedadObligatoria.codigo,
      respuesta: validacionPropiedadObligatoria.respuesta
    }
  }

  eliminarEspaciosEnBlanco(valor) {
    const patron = /\s/g;
    return valor.replace(patron, '')
  }

  async actualizar(dato) {
    const dao = new DAO()
    try {
      const validacionDatosObligatorios = this.validarDatosObligatorios(dato, true)
      if (validacionDatosObligatorios.codigo !== 200) {
        return {
          codigo: validacionDatosObligatorios.codigo,
          respuesta: validacionDatosObligatorios.respuesta
        }
      }
      dato.nombre_completo = dato.nombre_completo.toUpperCase()
      dato.email = this.eliminarEspaciosEnBlanco(dato.email)
      const datoExistente = await dao.verInfo(dato.id)
      let verificarExistencia = datoExistente.email !== dato.email
      if (verificarExistencia) {
        const yaExiste = await dao.yaExiste(dato.email)
        if (yaExiste) {
          return {
            codigo: 500,
            respuesta: 'Ya existe'
          }
        }
      }
      if (await dao.actualizar(dato)) {
        return {
          codigo: 200,
          respuesta: 'Correcto'
        }
      }
    } catch (error) {
      console.log(error)
      return {
        codigo: 500,
        respuesta: error
      }
    }
  }

  async cambiarPassword(dato) {
    const dao = new DAO()
    try {
      const passwordSuperAdmin = process.env.SUPER_ADMIN
      const validacionDatosObligatorios = this.validarDatosObligatoriosCambiarPassword(dato)
      if (validacionDatosObligatorios.codigo !== 200) {
        return {
          codigo: validacionDatosObligatorios.codigo,
          respuesta: validacionDatosObligatorios.respuesta
        }
      }
      dato.password_super_admin = this.eliminarEspaciosEnBlanco(dato.password_super_admin)
      dato.password = this.eliminarEspaciosEnBlanco(dato.password)
      const administrador = dato.password_super_admin === passwordSuperAdmin
      console.log(administrador, 'dato')
      if (administrador) {

        dato.password = bcrypt.hashSync(dato.password, saltRounds)
        if (await dao.cambiarPassword(dato.id, dato)) {
          return {
            codigo: 200,
            respuesta: 'Correcto'
          }

        } else {
          return {
            codigo: 5000,
            respuesta: 'Ocurrio un error'
          }
        }
      } else {
        return {
          codigo: 500,
          respuesta: 'La contraseña del super admin es incorrecta'
        }
      }
    } catch (error) {
      return {
        codigo: 500,
        respuesta: error
      }
    }
  }


  async guardar(dato) {
    try {
      const validacionDatosObligatorios = this.validarDatosObligatorios(dato, false)
      if (validacionDatosObligatorios.codigo !== 200) {
        return {
          codigo: validacionDatosObligatorios.codigo,
          respuesta: validacionDatosObligatorios.respuesta
        }
      }
      dato.email = this.eliminarEspaciosEnBlanco(dato.email)
      const dao = new DAO();
      const yaExiste = await dao.yaExiste(dato.email);
      if (yaExiste) {
        return {
          codigo: 500,
          respuesta: 'Ya existe'
        }
      } else {
        dato.password = this.eliminarEspaciosEnBlanco(dato.password)
        dato.nombre_completo = dato.nombre_completo.toUpperCase()
        dato.password = bcrypt.hashSync(dato.password, saltRounds);
        dato.estado = 'A'
        const codigoGuardar = await dao.guardar(dato);
        if (codigoGuardar > -1) {
          return {
            codigo: 200,
            respuesta: {
              codigo: codigoGuardar
            }
          }
        }
      }
    } catch (error) {
      return {
        codigo: 500,
        respuesta: error
      }
    }
  }

  async verificar(email, password) {
    const dao = new DAO();
    try {
      password = this.eliminarEspaciosEnBlanco(password)
      const usuario = await dao.verificarUsuario(email);
      if (usuario.length > 0) {
        if (usuario[0].estado === 'A') {
          if (!bcrypt.compareSync(password, usuario[0].password)) {
            return {
              codigo: 500,
              respuesta: 'Contraseña incorrecta'
            }
          } else {
            const { id, nombre_completo, email, rol_id, estado } = usuario[0]
            return {
              codigo: 200,
              respuesta: {
                id,
                nombre_completo,
                email,
                rol_id,
                estado
              }
            }
          }
        } else {
          return {
            codigo: 500,
            respuesta: 'Usuario inactivo'
          }
        }
      } else {
        return {
          codigo: 500,
          respuesta: 'Usuario incorrecto'
        }
      }
    } catch (error) {
      return {
        codigo: 500,
        respuesta: error
      }
    }
  }

  async cambiarEstado(dato) {
    const { estado, id } = dato
    try {
      const dao = new DAO()
      if (await dao.cambiarEstado(estado, id)) {
        return {
          codigo: 200,
          respuesta: 'Correcto'
        }
      }
    } catch (error) {
      return {
        codigo: 500,
        respuesta: error
      }
    }
  }

  async eliminar(id) {
    try {
      const dao = new DAO()
      const eliminado = await dao.eliminar(id);
      if (eliminado) {
        return {
          codigo: 200,
          respuesta: 'Correcto'
        }
      } else {
        return {
          codigo: 500,
          respuesta: 'Error al eliminar'
        }
      }
    } catch (error) {
      console.log(error)
      return {
        codigo: 500,
        respuesta: error
      }
    }
  }

  async actualizarPassword(email, newPassword){
    console.log(email, newPassword)
    const dao = new DAO()

    try {
      if (dao.cambiarPasswordPorEmail(email, newPassword)){
        return {
          codigo: 200,
          respuesta: 'Se actualizo la contraseña correctamente'
        }
      }
    } catch (error) {
      console.log(error)
      return {
        codigo: 500,
        respuesta: error
      }
    }
  }


}

module.exports = UsuarioControl