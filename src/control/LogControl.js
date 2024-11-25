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

  async verEntreFechas(fechaInicial, fechaFinal, limite, offset) {
    console.log(fechaInicial, fechaFinal, limite, offset)
    try {
      const dao = new DAO();
      const { datos, total } = await dao.obtenerEntreFechas(fechaInicial, fechaFinal, limite, offset);
      return {
        codigo: 200,
        respuesta: { datos, total },
      };
    } catch (error) {
      console.log(error)
      return { codigo: 500, respuesta: error };
    }
  }

  async verFiltradoEntreFechas(condicion, buscar, fechaInicial, fechaFinal, limite, offset) {
    try {
      const dao = new DAO();
      const { datos, total } = await dao.obtenerFiltradoEntreFechas(condicion, buscar, fechaInicial, fechaFinal, limite, offset);
      return {
        codigo: 200,
        respuesta: { datos, total },
      };
    } catch (error) {
      return { codigo: 500, respuesta: error };
    }
  }


}

module.exports = LogControl