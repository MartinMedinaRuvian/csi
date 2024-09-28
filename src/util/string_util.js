class StringUtil {
	
	eliminarEspaciosEnBlanco(valor) {
			const patron = /\s/g;
			return valor.replace(patron, '')
	}

}

module.exports = StringUtil