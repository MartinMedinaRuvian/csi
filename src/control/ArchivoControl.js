const DAO = require('../dao/ArchivoDAO');
const FechaUti = require('../util/Fecha')

class ArchivoControl {

  nombreTabla

  constructor(nomber_tabla) {
    this.nombreTabla = nomber_tabla
  }

  async guardar(nombreArchivo, nombreArchivoOriginal, idRegistroTabla) {
    const dao = new DAO(this.nombreTabla)
    const ruta = 'archivos/' + nombreArchivo
    try {
      const archivoGuardar = {
        nombre: nombreArchivoOriginal,
        ruta,
        fecha_creacion: new FechaUti().fechaActual()
      }
      const idArchivoGuardar = await dao.guardarArchivo(archivoGuardar);
      if (idArchivoGuardar > -1) {
        const idArchivoTablaGuardar = await dao.guardarArchivoTabla(idArchivoGuardar, idRegistroTabla)
        if (idArchivoTablaGuardar > -1) {
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

  async verTodosArchivosRegistro(id) {
    return await new DAO(this.nombreTabla).verTodosArchivosPorIdRegistro(id)
  }

  async verInfoArchivo(idArchivo) {
    return await new DAO(this.nombreTabla).verInfoArchivo(idArchivo)
  }

  async eliminar(idArchivo, idRegistroTabla) {
    try {
      console.log(idArchivo, idRegistroTabla)
      const dao = new DAO(this.nombreTabla)
      if (await dao.eliminarArchivoTabla(idArchivo, idRegistroTabla)) {
        if (await dao.eliminarArchivo(idArchivo)) {
          return true
        } 
      }

    } catch (error) {
      console.log(error)
    }
    return false
  }


}

module.exports = ArchivoControl