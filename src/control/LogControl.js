const DAO = require('../dao/LogDAO');

class LogControl {

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

  async verEntreFechas(fechaInicial, fechaFinal) {
    try {
      const dao = new DAO()
      const datos = await dao.obtenerEntreFechas(fechaInicial, fechaFinal)
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

  async verFiltradoEntreFechas(condicion, buscar, fechaInicial, fechaFinal) {
    try {
      const dao = new DAO()
      const datos = await dao.obtenerFiltradoEntreFechas(condicion, buscar, fechaInicial, fechaFinal)
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

}

module.exports = LogControl