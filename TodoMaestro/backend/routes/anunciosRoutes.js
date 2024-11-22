const express = require('express');
const anuncioController = require('../controllers/anunciosControler');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/usuariosanuncios/:idUsuario', anuncioController.getAnunciosByIdUsuario);

// Rutas generales de anuncios
router.get('/anuncios', anuncioController.getAllAnuncios);
router.post('/anuncios', anuncioController.createAnuncio);
router.put('/anuncios/:id_ad', anuncioController.updateAnuncio);
router.delete('/anuncios/:id_ad', anuncioController.deleteAnuncio);
router.get('/anuncios/:titulo', anuncioController.getAnuncioByTitulo);
router.get('/findanuncios', anuncioController.AnuncioRecienCreado);
module.exports = router;
