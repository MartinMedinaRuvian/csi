const DAO = require('../dao/CentroCableadoDAO');
const ValidacionPropiedadesObligatorias = require('../util/validar_propiedades');
const StringUtil = require('../util/string_util')
const FechaUti = require('../util/Fecha')

class CentroCableadoControl {

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
      const datos = await dao.verCentroCableadosPorCodigo(codigo)
      if (datos.length > 0) {
        return {
          codigo: 200,
          respuesta: datos
        }
      } else {
        return {
          codigo: 500,
          respuesta: 'No existe un CentroCableado con el código ' + codigo
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


  async guardar(dato) {
    const dao = new DAO()
    try {
      dato.estado = 'A'
      dato.fecha_creacion = new FechaUti().fechaActual()
      const codigoGuardar = await dao.guardar(dato);
      if (codigoGuardar > -1) {
        return {
          codigo: 200,
          respuesta: {
            codigo: codigoGuardar
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

module.exports = CentroCableadoControl