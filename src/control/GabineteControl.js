const DAO = require('../dao/GabineteDAO');
const ValidacionPropiedadesObligatorias = require('../util/validar_propiedades');
const FechaUti = require('../util/Fecha')

class GabineteControl {

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

  async verPorIdCentroCableado(id_centro_cableado) {
    const dao = new DAO();
    try {
      const datos = await dao.verPorIdCentroCableado(id_centro_cableado)
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
    const datosObligatorios = ['numero', 'tipo', 'tamanio', 'aterrizado', 'id_centro_cableado']
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
      dato.tamanio = dato.tamanio.toUpperCase()
      dato.aterrizado = dato.aterrizado.toUpperCase()
      dato.estado = 'A'
      dato.fecha_creacion = new FechaUti().fechaActual()

      const yaExiste = await dao.yaExiste(dato.numero, dato.id_centro_cableado);
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

module.exports = GabineteControl