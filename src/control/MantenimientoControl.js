const DAO = require('../dao/MantenimientoDAO');
const FechaUti = require('../util/Fecha');
const StringUtil = require('../util/string_util');
const ValidacionPropiedadesObligatorias = require('../util/validar_propiedades');

class MantenimientoControl {

  nombreTabla

  constructor(nomber_tabla) {
    this.nombreTabla = nomber_tabla
  }

  validarDatosObligatorios(dato) {
    const datosObligatorios = ['codigo', 'observacion', 'realizado_por', 'fecha']
    const validarPropiedadesObligatorias = new ValidacionPropiedadesObligatorias()
    const validacionPropiedadObligatoria = validarPropiedadesObligatorias.validar(dato, datosObligatorios)
    return {
      codigo: validacionPropiedadObligatoria.codigo,
      respuesta: validacionPropiedadObligatoria.respuesta
    }
  }


  async verInfo(id) {
    const dao = new DAO('');
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

  async verInfoMantenimiento(idMantenimiento) {
    return await new DAO(this.nombreTabla).verInfo(idMantenimiento)
  }

  async eliminarSoloMantenimientoTabla(idMantenimiento, idRegistroTabla) {
    try {
      console.log(idMantenimiento, idRegistroTabla)
      const dao = new DAO(this.nombreTabla)
      if (await dao.eliminarMantenimientoTabla(idMantenimiento, idRegistroTabla)) {
        return true
      }
    } catch (error) {
      console.log(error)
    }
    return false
  }
 
  async verInfoPrincipal() {
    const dao = new DAO('');
    try {
      const datos = await dao.verInfoPrincipal();
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

  async guardar(datos, idRegistroTabla) {
    try {
      const dao = new DAO(this.nombreTabla)
      console.log(datos, idRegistroTabla, this.nombreTabla, 'guardar mantenimiento')
      const validacionDatosObligatorios = this.validarDatosObligatorios(datos)
      if (validacionDatosObligatorios.codigo !== 200) {
        return {
          codigo: validacionDatosObligatorios.codigo,
          respuesta: validacionDatosObligatorios.respuesta
        }
      }

      const yaExisteMantenimientoEnElemento = await dao.yaExisteMantenimientoEnElemento(datos.codigo, idRegistroTabla);
      if (yaExisteMantenimientoEnElemento) {
        return {
          codigo: 500,
          respuesta: 'Ya existe el Mantenimiento'
        }
      }

      const stringUtil = new StringUtil()
      datos.codigo = stringUtil.transformarTodoEnMayusculas(datos.codigo)
      datos.realizado_por = stringUtil.transformarTodoEnMayusculas(datos.realizado_por)
      datos.fecha_creacion = new FechaUti().fechaActual()
      datos.estado = 'A'
      const yaExisteMantenimiento = await dao.yaExisteMantenimiento(datos.codigo);
      let idMantenimientoGuardar = -1
      if (!yaExisteMantenimiento) {
        idMantenimientoGuardar = await dao.guardarMantenimiento(datos);
      } else {
        idMantenimientoGuardar = await dao.verIdMantenimientoPorCodigo(datos.codigo)
      }
      if (idMantenimientoGuardar > -1) {
        const idMantenimientoTablaGuardar = await dao.guardarMantenimientoTabla(idMantenimientoGuardar, idRegistroTabla)
        if (idMantenimientoTablaGuardar > -1) {
          return {
            codigo: 200,
            respuesta: {
              id: idMantenimientoGuardar
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

  async verConFiltro(condicion, buscar, limite, offset) {
    try {
      const dao = new DAO();
      const { datos, total } = await dao.obtenerFiltrado(condicion, buscar, limite, offset);
      return {
        codigo: 200,
        respuesta: { datos, total }
      };
    } catch (error) {
      return { codigo: 500, respuesta: error };
    }
  }

  async verTodosMantenimientosRegistroObtenerFiltrado(id, condicion, buscar, limite, offset) {
    try {
     const { datos, total } = await new DAO(this.nombreTabla).verTodosMantenimientosPorIdRegistroObtenerFiltrado(id, condicion, buscar, limite, offset)
     return {
      codigo: 200,
      respuesta: { datos, total }
    };
    } catch (error) {
      return { codigo: 500, respuesta: error };
    }
  }

  async verTodosMantenimientosRegistroEntreFechas(id, fechaInicial, fechaFinal, limite, offset) {
    try {
      const { datos, total } = await new DAO(this.nombreTabla).verTodosMantenimientosPorIdRegistroEntreFechas(id, fechaInicial, fechaFinal, limite, offset)
      return {
        codigo: 200,
        respuesta: { datos, total }
      };
    } catch (error) {
      console.log(error)
      return { codigo: 500, respuesta: error };
    }
  }

  async verTodosMantenimientosRegistroFiltrosFecha(id, fechaInicial, fechaFinal, condicion, buscar, limite, offset) {
    try {
      const { datos, total } = await new DAO(this.nombreTabla).verTodosMantenimientosPorIdRegistroFiltroFechas(id, fechaInicial, fechaFinal, condicion, buscar, limite, offset)
      return {
        codigo: 200,
        respuesta: { datos, total }
      };
    } catch (error) {
      return { codigo: 500, respuesta: error };
    }
  }
  
  async actualizar(dato) {
    const dao = new DAO('')
    try {
      const stringUtil = new StringUtil()
      dato.codigo = stringUtil.transformarTodoEnMayusculas(dato.codigo)
      dato.realizado_por = stringUtil.transformarTodoEnMayusculas(dato.realizado_por)
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

  async eliminar(idMantenimiento, idRegistroTabla) {
    try {
      console.log(idMantenimiento, idRegistroTabla)
      const dao = new DAO(this.nombreTabla)
      if (await dao.eliminarMantenimientoTabla(idMantenimiento, idRegistroTabla)) {
        if (await dao.eliminarMantenimiento(idMantenimiento)) {
          return true
        } 
      }

    } catch (error) {
      console.log(error)
    }
    return false
  }


}

module.exports = MantenimientoControl