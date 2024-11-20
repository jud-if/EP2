const express = require('express');
const userController = require('../controllers/userControler');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Ruta para obtener el perfil de un usuario
router.get('/usuarios/:id', userController.getUserProfile);

// Ruta para actualizar un usuario por ID
router.put('/usuarios/:id', userController.updateUserById);

// Ruta para eliminar un usuario por ID
router.delete('/usuarios/:id', userController.deleteUserById);

module.exports = router;