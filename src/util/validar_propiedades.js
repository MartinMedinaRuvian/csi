class ValidacionPropiedadesObligatorias{
  validar(objeto, propiedadesObligatorias) {
    const cantidadPropiedades = Object.keys(objeto).length;
  
    if (cantidadPropiedades > 0) {
      for (let propiedad of propiedadesObligatorias) {
        if (objeto[propiedad] === undefined || objeto[propiedad] === null || objeto[propiedad] === '') {
          return {
            codigo: 500,
            respuesta: `Ingrese ${propiedad}`
          };
        }
      }
    } else {
      return {
        codigo: 500,
        respuesta: 'Ingrese los datos obligatorios'
      };
    }

    return {
      codigo: 200
    }
  }

  validarConDatosNumericos(objeto, propiedadesObligatorias, propiedadesNumericas) {
    const cantidadPropiedades = Object.keys(objeto).length;
  
    if (cantidadPropiedades > 0) {
      for (let propiedad of propiedadesObligatorias) {
        if (objeto[propiedad] === undefined || objeto[propiedad] === null || objeto[propiedad] === '') {
          return {
            codigo: 500,
            respuesta: `Ingrese ${propiedad}`
          };
        }
      } 
      if (propiedadesNumericas !== null && propiedadesNumericas !== undefined && propiedadesNumericas.length > 0) {
        for (let propiedad of propiedadesNumericas) {     
        const patron = /^[0-9]+$/;
        if (!patron.test(objeto[propiedad])) {
          return {
            codigo: 500,
            respuesta: `${propiedad} debe ser un número`
          };
        }
      }
     }
    } else {
      return {
        codigo: 500,
        respuesta: 'Ingrese los datos obligatorios'
      };
    }
  
    return {
      codigo: 200
    };
  }

}

module.exports = ValidacionPropiedadesObligatorias