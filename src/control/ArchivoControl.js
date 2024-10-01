const DAO = require('../dao/ArchivoDAO');
const FechaUti = require('../util/Fecha')

class ArchivoControl {

  nombreTabla

  constructor(nomber_tabla) {
    this.nombreTabla = nomber_tabla
  }

  async guardar(nombreArchivo, idRegistroTabla) {
    const dao = new DAO(this.nombreTabla)
    const ruta = 'archivos/' + nombreArchivo 
    try {
      const archivoGuardar = {
        nombre: nombreArchivo,
        ruta,
        fecha_creacion: new FechaUti().fechaActual()
      }
      const idArchivoGuardar = await dao.guardarArchivo(archivoGuardar);
      if (idArchivoGuardar > -1) {
        const idArchivoTablaGuardar = await dao.guardarArchivoTabla(idArchivoGuardar, idRegistroTabla)
        if (idArchivoTablaGuardar > -1){
          return {
            codigo: 200,
            respuesta: {
              id: idArchivoGuardar
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

module.exports = ArchivoControl