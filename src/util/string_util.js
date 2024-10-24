class StringUtil {
	
	eliminarEspaciosEnBlanco(valor) {
			const patron = /\s/g;
			return valor.replace(patron, '')
	}

	transformarTodoEnMayusculas(valor){
		return valor != null && valor != undefined ? valor.toUpperCase() : valor
	}

}

module.exports = StringUtil