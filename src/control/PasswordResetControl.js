const jwt = require('jsonwebtoken');
const transporter = require('../util/mailer');
require("dotenv").config();

class PasswordResetControl {
  async sendPasswordResetEmail(userEmail) {
    const token = jwt.sign({ email: userEmail }, process.env.TOKEN_SECRETO, { expiresIn: '15m' });
    const resetLink = `http://${process.env.SERVER}:${process.env.PUERTO_SERVER}/reset-password?token=${token}`;
    
    const mailOptions = {
      from: process.env.EMAIL,
      to: userEmail,
      subject: 'Recuperación de contraseña CSI Services APP',
      text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetLink}`,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log('Correo de recuperación enviado');
      return {
        codigo: 200,
        respuesta: { mensaje: 'Correo de recuperación enviado'}
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
