const DAO = require('../dao/ProyectoDAO');
const FechaUti = require('../util/Fecha');
const StringUtil = require('../util/string_util');
const ValidacionPropiedadesObligatorias = require('../util/validar_propiedades');

class ProyectoControl {

  nombreTabla

  constructor(nomber_tabla) {
    this.nombreTabla = nomber_tabla
  }

  validarDatosObligatorios(dato) {
    const datosObligatorios = ['codigo', 'descripcion', 'nombre_empresa', 'nit_empresa', 'fecha']
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

  async verInfoPrincipal() {
    const dao = new DAO('');
    try {
      const datos = await dao.verInfoPrincipal();
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
      const validacionDatosObligatorios = this.validarDatosObligatorios(datos)
      if (validacionDatosObligatorios.codigo !== 200) {
        return {
          codigo: validacionDatosObligatorios.codigo,
          respuesta: validacionDatosObligatorios.respuesta
        }
      }

      const yaExisteProyectoEnElemento = await dao.yaExisteProyectoEnElemento(datos.codigo, idRegistroTabla);
      if (yaExisteProyectoEnElemento) {
        return {
          codigo: 500,
          respuesta: 'Ya existe el Proyecto'
        }
      }

      const stringUtil = new StringUtil()
      datos.codigo = stringUtil.transformarTodoEnMayusculas(datos.codigo)
      datos.descripcion = stringUtil.transformarTodoEnMayusculas(datos.descripcion)
      datos.nombre_empresa = stringUtil.transformarTodoEnMayusculas(datos.nombre_empresa)
      datos.fecha_creacion = new FechaUti().fechaActual()
      datos.estado = 'A'
      const yaExisteProyecto = await dao.yaExisteProyecto(datos.codigo);
      let idProyectoGuardar = -1
      if (!yaExisteProyecto) {
        idProyectoGuardar = await dao.guardarProyecto(datos);
      } else {
        idProyectoGuardar = await dao.verIdProyectoPorCodigo(datos.codigo)
      }
      console.log(idProyectoGuardar, 'idproyectoguardar')
      if (idProyectoGuardar > -1) {
        const idProyectoTablaGuardar = await dao.guardarProyectoTabla(idProyectoGuardar, idRegistroTabla)
        if (idProyectoTablaGuardar > -1) {
          return {
            codigo: 200,
            respuesta: {
              id: idProyectoGuardar
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
    const dao = new DAO('')
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
      dato.descripcion = stringUtil.transformarTodoEnMayusculas(dato.descripcion)
      dato.nombre_empresa = stringUtil.transformarTodoEnMayusculas(dato.nombre_empresa)
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

  async verTodosProyectosRegistro(id, condicion, buscar) {
    console.log(condicion, buscar, 'titindj')
    return await new DAO(this.nombreTabla).verTodosProyectosPorIdRegistro(id, condicion, buscar)
  }

  async verInfoProyecto(idProyecto) {
    return await new DAO(this.nombreTabla).verInfo(idProyecto)
  }

  async eliminar(idProyecto, idRegistroTabla) {
    try {
      console.log(idProyecto, idRegistroTabla)
      const dao = new DAO(this.nombreTabla)
      if (await dao.eliminarProyectoTabla(idProyecto, idRegistroTabla)) {
        if (await dao.eliminarProyecto(idProyecto)) {
          return true
        } 
      }

    } catch (error) {
      console.log(error)
    }
    return false
  }


  async eliminarSoloProyectoTabla(idProyecto, idRegistroTabla) {
    try {
      console.log(idProyecto, idRegistroTabla)
      const dao = new DAO(this.nombreTabla)
      if (await dao.eliminarProyectoTabla(idProyecto, idRegistroTabla)) {
        return true
      }
    } catch (error) {
      console.log(error)
    }
    return false
  }


}

module.exports = ProyectoControl