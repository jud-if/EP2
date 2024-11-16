// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authControler');
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware para verificar el token

const router = express.Router();

// Ruta para registrar un usuario
router.post('/register', authController.register);

// Ruta para iniciar sesión
router.post('/login', authController.login);

// Ruta para cerrar sesion
router.post('/logout', (req, res) => {
    res.clearCookie('authToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    res.json({ message: 'Sesión cerrada correctamente' });
  });
  


// Ruta para verificar el estado de autenticación
router.get('/status', authMiddleware, authController.checkAuthStatus);

module.exports = router;
