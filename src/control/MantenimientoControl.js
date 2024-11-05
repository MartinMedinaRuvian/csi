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

  async verTodosMantenimientosRegistro(id) {
    return await new DAO(this.nombreTabla).verTodosMantenimientosPorIdRegistro(id)
  }

  async verInfoMantenimiento(idMantenimiento) {
    return await new DAO(this.nombreTabla).verInfoMantenimiento(idMantenimiento)
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