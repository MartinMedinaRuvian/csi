const DAO = require('../dao/CentroCableadoDAO');
const ValidacionPropiedadesObligatorias = require('../util/validar_propiedades');
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

  async verPorIdEdificio(id_edificio) {
    const dao = new DAO();
    try {
      const datos = await dao.verPorIdEdificio(id_edificio)
      console.log(datos)
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

  validarDatosObligatorios(dato) {
    const datosObligatorios = ['numero', 'tipo', 'ubicacion', 'climatizado', 'camaras', 'acceso_llaves', 'acceso_biometrico', 'id_edificio']
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

      dato.tipo = dato.tipo.toUpperCase()
      dato.ubicacion = dato.ubicacion.toUpperCase()
      dato.climatizado = dato.climatizado.toUpperCase()
      dato.camaras = dato.camaras.toUpperCase()
      dato.acceso_llaves = dato.acceso_llaves.toUpperCase()
      dato.acceso_biometrico = dato.acceso_biometrico.toUpperCase()
      dato.estado = 'A'
      dato.fecha_creacion = new FechaUti().fechaActual()

      const yaExiste = await dao.yaExiste(dato.numero, dato.id_edificio);
      if (yaExiste) {
        return {
          codigo: 500,
          respuesta: 'Ya existe'
        }
      } else {
        const id = await dao.guardar(dato);
        if (id > -1) {
          return {
            codigo: 200,
            respuesta: {
              id: id
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
      dato.fecha_actualizacion = new FechaUti().fechaActual()
      if (await dao.actualizar(dato)) {
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