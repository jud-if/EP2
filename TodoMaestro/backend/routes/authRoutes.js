// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authControler');
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware para verificar el token

const router = express.Router();

// Ruta para registrar un usuario
router.post('/register', authController.register);

// Ruta para iniciar sesión
router.post('/login', authController.login);

// Ruta para verificar el estado de autenticación
router.get('/status', authMiddleware, authController.checkAuthStatus);

module.exports = router;
