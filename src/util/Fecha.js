class Fecha {
  fechaActual() {
    let date = new Date()

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    const dia = day < 10 ? '0' + day : day
    const mes = month < 10 ? '0' + month : month

    return year + '-' + mes + '-' + dia

  }

  horaActual() {
    let fechaActual = new Date();
    let hora = fechaActual.getHours();
    let minutos = fechaActual.getMinutes();

    // Asegúrate de agregar un 0 al frente si los minutos son menores a 10
    if (minutos < 10) {
      minutos = "0" + minutos;
    }

    return hora + ":" + minutos;
  }
}

module.exports = Fecha