class NormalizarObjecto {

  cambiarPropiedadesUndefinedPorNull(objectoValidar, ClaseObjecto) {

    // Extrae las propiedades de la clase
    const properties = Object.getOwnPropertyNames(new ClaseObjecto());

    const normalized = {};

    properties.forEach(prop => {
      normalized[prop] = objectoValidar.hasOwnProperty(prop) ? objectoValidar[prop] : null;
    });

    return normalized;
  }

}

module.exports = NormalizarObjecto