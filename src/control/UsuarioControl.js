const bcrypt = require('bcrypt');
const saltRounds = 10;

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

  async verConFiltro (condicion, buscar) {
    try {
      const dao = new DAO()
      const datos = await dao.obtenerFiltrado(condicion, buscar)
      return {
        codigo:200,
        respuesta:datos
      }
    } catch (error) {
      return {
        codigo:500,
        respuesta: error
      }
    }
  }

  validarDatosObligatorios(dato, actualizar) {
    const datosObligatorios = actualizar ? ['nombre_completo', 'identificacion'] : ['nombre_completo', 'identificacion', 'password']
    const validarPropiedadesObligatorias = new ValidacionPropiedadesObligatorias()
    const validacionPropiedadObligatoria = validarPropiedadesObligatorias.validar(dato, datosObligatorios)
    return {
      codigo: validacionPropiedadObligatoria.codigo,
      respuesta: validacionPropiedadObligatoria.respuesta
    }
  }

  validarDatosObligatoriosCambiarPassword(dato) {
    const datosObligatorios = ['passwordActual', 'password']
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
      dato.identificacion = this.eliminarEspaciosEnBlanco(dato.identificacion)
      const datoExistente = await dao.verInfo(dato.codigo)
      let verificarExistencia = datoExistente.identificacion !== dato.identificacion
      if (verificarExistencia) {
        const yaExiste = await dao.yaExiste(dato.identificacion)
        if (yaExiste) {
          return {
            codigo: 500,
            respuesta: 'Ya existe'
          }
        }
      }
      if (await dao.actualizar(dato.codigo, dato)) {
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

  async cambiarPassword(dato) {
    const dao = new DAO()
    try {
      const validacionDatosObligatorios = this.validarDatosObligatoriosCambiarPassword(dato)
      if (validacionDatosObligatorios.codigo !== 200) {
        return {
          codigo: validacionDatosObligatorios.codigo,
          respuesta: validacionDatosObligatorios.respuesta
        }
      }
      dato.passwordActual = this.eliminarEspaciosEnBlanco(dato.passwordActual)
      dato.password = this.eliminarEspaciosEnBlanco(dato.password)
      const administrador = await dao.verificarUsuarioPorCodigo(dato.codigoadministrador);
      console.log(dato, 'dato')
      if (administrador.length > 0) {
        if (!bcrypt.compareSync(dato.passwordActual, administrador[0].password)) {
          return {
            codigo: 400,
            respuesta: 'Contraseña de ' + administrador[0].nombre_completo + ' Incorrecta'
          }
        } else {
          dato.password = bcrypt.hashSync(dato.password, saltRounds)
          if (await dao.cambiarPassword(dato.codigo, dato)) {
            return {
              codigo: 200,
              respuesta: 'Correcto'
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


  async guardar(dato) {
    try {
      const validacionDatosObligatorios = this.validarDatosObligatorios(dato, false)
      if (validacionDatosObligatorios.codigo !== 200) {
        return {
          codigo: validacionDatosObligatorios.codigo,
          respuesta: validacionDatosObligatorios.respuesta
        }
      }
      dato.password = this.eliminarEspaciosEnBlanco(dato.password)
      dato.identificacion = this.eliminarEspaciosEnBlanco(dato.identificacion)
      dato.password = bcrypt.hashSync(dato.password, saltRounds);
      const dao = new DAO();
      const yaExiste = await dao.yaExiste(dato.identificacion);
      if (yaExiste) {
        return {
          codigo: 500,
          respuesta: 'Ya existe'
        }
      } else {
        dato.estado = "0"
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

  async verificar(identificacion, password) {
    const dao = new DAO();
    try {
      password = this.eliminarEspaciosEnBlanco(password)
      const usuario = await dao.verificarUsuario(identificacion);
      if (usuario.length > 0) {
        if (usuario[0].estado === '0') {
          if (!bcrypt.compareSync(password, usuario[0].password)) {
            return {
              codigo: 400,
              respuesta: 'Contraseña incorrecta'
            }
          } else {
            const { codigo, nombre_completo, identificacion, numero_telefono, rol_codigo, estado } = usuario[0]
            return {
              codigo: 200,
              respuesta: {
                codigo,
                nombre_completo,
                identificacion,
                numero_telefono,
                rol_codigo,
                estado
              }
            }
          }
        } else {
          return {
            codigo: 400,
            respuesta: 'Usuario inactivo'
          }
        }
      } else {
        return {
          codigo: 400,
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
    const { estado, codigo } = dato
    try {
      const dao = new DAO()
      if (await dao.cambiarEstado(estado, codigo)) {
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

  async eliminar(codigo) {
    try {
      const dao = new DAO()
      if (!await dao.registroTieneVentaRegistrada(codigo)) {
        const eliminado = await dao.eliminar(codigo);
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
      } else {
        return {
          codigo: 500,
          respuesta: 'El registro tiene al menos una venta registrada, no se puede eliminar'
        }
      }
    } catch (error) {
      return {
        codigo: 500,
        respuesta: error
      }
    }
  }


}

module.exports = UsuarioControl