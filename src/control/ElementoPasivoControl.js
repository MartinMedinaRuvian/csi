const DAO = require('../dao/ElementoPasivoDAO');
const ValidacionPropiedadesObligatorias = require('../util/validar_propiedades');
const StringUtil = require('../util/string_util')
const FechaUti = require('../util/Fecha')

class ElementoControl {

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

  async verInfo(id) {
    const dao = new DAO();
    try {
      const datos = await dao.verInfo(id);
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

  async verInformacionPrincipalPorIdGabinete(id_gabinete) {
    const dao = new DAO();
    try {
      const datos = await dao.verInfoPrincipalPorIdGabinete(id_gabinete)
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

  async verPorIdGabinete(id_gabinete, condicion, buscar) {
    console.log(id_gabinete, condicion, buscar)
    const dao = new DAO();
    try {
      const datos = await dao.verPorIdGabinete(id_gabinete, condicion, buscar)
      console.log(datos)
      return {
        codigo: 200,
        respuesta: datos
      }
    } catch (error) {
      console.log(error)
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
    const datosObligatorios = ['id_tipo_dispositivo_pasivo', 'codigo', 'id_gabinete', 'id_usuario']
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

      const stringUtil = new StringUtil()
      dato.codigo = stringUtil.transformarTodoEnMayusculas(dato.codigo)
      dato.categoria = stringUtil.transformarTodoEnMayusculas(dato.categoria)
      dato.tipo_conector = stringUtil.transformarTodoEnMayusculas(dato.tipo_conector)
      dato.codigo_inventario = stringUtil.transformarTodoEnMayusculas(dato.codigo_inventario)
      
      dato.estado = 'A'
      dato.fecha_creacion = new FechaUti().fechaActual()
      const yaExiste = await dao.yaExiste(dato.codigo, dato.id_gabinete);
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
      console.log(error)
      return {
        codigo: 500,
        respuesta: error
      }
    }
  }

  async actualizar(dato) {
    const dao = new DAO()
    try {

      const validacionDatosObligatorios = this.validarDatosObligatorios(dato)
      if (validacionDatosObligatorios.codigo !== 200) {
        return {
          codigo: validacionDatosObligatorios.codigo,
          respuesta: validacionDatosObligatorios.respuesta
        }
      }

      const stringUtil = new StringUtil()
      dato.codigo = stringUtil.transformarTodoEnMayusculas(dato.codigo)
      dato.categoria = stringUtil.transformarTodoEnMayusculas(dato.categoria)
      dato.tipo_conector = stringUtil.transformarTodoEnMayusculas(dato.tipo_conector)
      dato.codigo_inventario = stringUtil.transformarTodoEnMayusculas(dato.codigo_inventario)

      dato.fecha_actualizacion = new FechaUti().fechaActual()
      console.log(dato)

      const datoExistente = await dao.verInfoExistente(dato.id)
      let verificarExistencia = datoExistente.codigo !== dato.codigo
      if (verificarExistencia) {
        const yaExiste = await dao.yaExiste(dato.codigo, dato.id_gabinete)
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
      } else {
        return {
          codigo: 500,
          respuesta: 'Error al actualizar'
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

    } catch (error) {
      console.log(error)
      return {
        codigo: 500,
        respuesta: error
      }
    }
  }


}

module.exports = ElementoControl