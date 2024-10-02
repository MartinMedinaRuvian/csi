const NormalizarObjecto = require('../util/normalizar_objecto')

class GenerarQueryActualizarDB {

  objecto
  nombreTabla
  idPropiedad
  propiedadesAActualizar

  constructor(objecto, nombreTabla, idPropiedad, clase) {
    const normalizarObjecto = new NormalizarObjecto();
    this.objecto = normalizarObjecto.cambiarPropiedadesUndefinedPorNull(objecto, clase);
    this.nombreTabla = nombreTabla
    this.idPropiedad = idPropiedad

    // Obtener las claves del objeto
    const propiedades = Object.keys(objecto);
    // Filtrar las propiedades que son diferentes de idPropiedad
    this.propiedadesAActualizar = propiedades.filter(prop => prop !== idPropiedad);
  }

  async consultaGenerada() {
    // Generar la parte de la consulta SET
    const setPart = this.propiedadesAActualizar.map(prop => {
      return `${prop} = IFNULL(?, ${prop})`;
    }).join(', ');

    // Crear la consulta SQL
    const query = `UPDATE ${this.nombreTabla} SET ${setPart} WHERE ${this.idPropiedad} = ?`;
    return query
  }

  valoresGenerados() {
    // Crear el array de valores
    const valores = this.propiedadesAActualizar.map(prop => this.objecto[prop]);
    valores.push(this.objecto[this.idPropiedad]); // Agregar el valor del ID al final
    return valores
  }

}

module.exports = GenerarQueryActualizarDB