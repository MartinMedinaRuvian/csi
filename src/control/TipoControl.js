const DAO = require('../dao/TipoDAO');
const ValidacionPropiedadesObligatorias = require('../util/validar_propiedades');
const FechaUti = require('../util/Fecha')

nombreTabla = ''

class TipoControl {

  constructor(nombre_tabla){
    this.nombreTabla = nombre_tabla
  }

  async verTodos() {
    const dao = new DAO(this.nombreTabla);
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

  async verPorId(id) {
    const dao = new DAO(this.nombreTabla);
    try {
      const datos = await dao.verPorId(id);
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
      const dao = new DAO(this.nombreTabla)
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
    const datosObligatorios = ['descripcion']
    const validarPropiedadesObligatorias = new ValidacionPropiedadesObligatorias()
    const validacionPropiedadObligatoria = validarPropiedadesObligatorias.validar(dato, datosObligatorios)
    return {
      codigo: validacionPropiedadObligatoria.codigo,
      respuesta: validacionPropiedadObligatoria.respuesta
    }
  }

  async guardar(dato) {
    const dao = new DAO(this.nombreTabla)
    try {
      const validacionDatosObligatorios = this.validarDatosObligatorios(dato)
      if (validacionDatosObligatorios.codigo !== 200) {
        return {
          codigo: validacionDatosObligatorios.codigo,
          respuesta: validacionDatosObligatorios.respuesta
        }
      }
      const yaExiste = await dao.yaExiste(dato.descripcion);
      if (yaExiste) {
        return {
          codigo: 500,
          respuesta: 'Ya existe'
        }
      } else {
        dato.descripcion = dato.descripcion.toUpperCase()
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
      console.log(error)
      return {
        codigo: 500,
        respuesta: error
      }
    }
  }

  async actualizar(dato) {
    const dao = new DAO(this.nombreTabla)
    try {
      const validacionDatosObligatorios = this.validarDatosObligatorios(dato)
      if (validacionDatosObligatorios.codigo !== 200) {
        return {
          codigo: validacionDatosObligatorios.codigo,
          respuesta: validacionDatosObligatorios.respuesta
        }
      }
      dato.descripcion = dato.descripcion.toUpperCase()
      dato.fecha_actualizacion = new FechaUti().fechaActual()
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
      console.log(error)
      return {
        codigo: 500,
        respuesta: error
      }
    }
  }

  async cambiarEstado(dato) {
    const { estado, id } = dato
    try {
      const dao = new DAO(this.nombreTabla)
      if (await dao.cambiarEstado(estado, id)) {
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
      const dao = new DAO(this.nombreTabla)
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

module.exports = TipoControl