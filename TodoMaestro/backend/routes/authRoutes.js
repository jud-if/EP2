// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authControler');

const router = express.Router();

// Ruta para registrar un usuario
router.post('/register', authController.register);

// Ruta para iniciar sesión
router.post('/login', authController.login);

module.exports = router;
