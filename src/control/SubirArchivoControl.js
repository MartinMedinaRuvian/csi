const multer = require('multer');
const path = require('path');
const fs = require('fs');

class SubirArchivoControl {
  constructor() {
    this.crearCarpetaArchivos();
    this.storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../archivos'));
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
      }
    });
    this.upload = multer({ storage: this.storage });
  }

  crearCarpetaArchivos() {
    try {
      fs.mkdirSync(path.join(__dirname, '../archivos'));
    } catch (err) {
      if (err.code !== 'EEXIST') throw err;
    }
  }

  eliminarArchivo(ruta_archivo) {
    try {
      const rutaArchivo = path.join(__dirname, '../' + ruta_archivo);
      if (fs.existsSync(rutaArchivo)) {
        console.log(rutaArchivo, 'eliminar');
        fs.unlinkSync(rutaArchivo);
        return true;
      }
    } catch (err) {
      console.error('Error al eliminar el archivo', err);
    }
    return false;
  }
}

module.exports = SubirArchivoControl;