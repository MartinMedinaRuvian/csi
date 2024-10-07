const DAO = require('../dao/EdificioDAO');
const ValidacionPropiedadesObligatorias = require('../util/validar_propiedades');
const StringUtil = require('../util/string_util')
const FechaUti = require('../util/Fecha')

class EdificioControl {

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

  async verPorCodigo(codigo) {
    const dao = new DAO();
    try {
      const datos = await dao.verEdificiosPorCodigo(codigo)
      if (datos.length > 0) {
        return {
          codigo: 200,
          respuesta: datos
        }
      } else {
        return {
          codigo: 500,
          respuesta: 'No existe un Edificio con el código ' + codigo
        }
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

  validarDatosObligatorios(dato) {
    const datosObligatorios = ['codigo', 'nombre']
    const validarPropiedadesObligatorias = new ValidacionPropiedadesObligatorias()
    const validacionPropiedadObligatoria = validarPropiedadesObligatorias.validar(dato, datosObligatorios)
    return {
      codigo: validacionPropiedadObligatoria.codigo,
      respuesta: validacionPropiedadObligatoria.respuesta
    }
  }

  async guardar(dato) {
    const dao = new DAO()
    try {
      const validacionDatosObligatorios = this.validarDatosObligatorios(dato)
      if (validacionDatosObligatorios.codigo !== 200) {
        return {
          codigo: validacionDatosObligatorios.codigo,
          respuesta: validacionDatosObligatorios.respuesta
        }
      }
      dato.codigo = new StringUtil().eliminarEspaciosEnBlanco(dato.codigo).toUpperCase()
      dato.nombre = dato.nombre.toUpperCase()
      const yaExiste = await dao.yaExiste(dato.codigo);
      if (yaExiste) {
        return {
          codigo: 500,
          respuesta: 'Ya existe'
        }
      } else {
        dato.estado = 'A'
        dato.fecha_creacion = new FechaUti().fechaActual()
        const idGuardar = await dao.guardar(dato);
        if (idGuardar > -1) {
          return {
            codigo: 200,
            respuesta: {
              id: idGuardar
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

  async actualizar(dato) {
    const dao = new DAO()
    try {
      if (dato.codigo != null && dato.codigo != undefined){
        dato.codigo = new StringUtil().eliminarEspaciosEnBlanco(dato.codigo).toUpperCase()
      }
      dato.fecha_actualizacion = new FechaUti().fechaActual()
      if (dato.nombre != null && dato.nombre != undefined){
        dato.nombre = dato.nombre.toUpperCase()
      }
      if (await dao.actualizar(dato)) {
        return {
          codigo: 200,
          respuesta: 'Correcto'
        }
      } else {
        return {
          codigo: 500,
          respuesta: 'Ocurrio un error'
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
      } else {
        return {
          codigo: 404,
          respuesta: 'Incorrecto'
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
      return {
        codigo: 500,
        respuesta: error
      }
    }
  }


}

module.exports = EdificioControl