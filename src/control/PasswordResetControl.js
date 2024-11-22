const jwt = require('jsonwebtoken');
const transporter = require('../util/mailer');
require("dotenv").config();
const DAO = require('../dao/UsuarioDAO');

class PasswordResetControl {

  async verificarExistenciaEmail(email) {
    const dao = new DAO()
    if (await dao.yaExiste(email)) {
      return true
    }
    return false
  }

  async sendPasswordResetEmail(userEmail) {
    try {
      const existeEmail = await this.verificarExistenciaEmail(userEmail)
      console.log(existeEmail)
      if (existeEmail) {
        const token = jwt.sign({ email: userEmail }, process.env.TOKEN_SECRETO_CAMBIO_PASSWORD, { expiresIn: '15m' });
        const resetLink = `http://${process.env.SERVER}:${process.env.PUERTO_SERVER}/reset-password?token=${token}`;

        const mailOptions = {
          from: process.env.EMAIL,
          to: userEmail,
          subject: 'Recuperación de contraseña CSI Services APP',
          text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetLink}`,
        };

        await transporter.sendMail(mailOptions);
        console.log('Correo de recuperación enviado');
        return {
          codigo: 200,
          respuesta: { mensaje: 'Correo de recuperación enviado' }
        }
      } else {
        return {
          codigo: 500,
          respuesta: { mensaje: 'Email no existente' }
        }
      }

    } catch (error) {
      return {
        codigo: 500,
        respuesta: { error }
      }
    }
  }
}



module.exports = PasswordResetControl;
