const express = require('express');
const anuncioController = require('../controllers/anunciosControler');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, anuncioController.createAnuncio);
router.get('/',authMiddleware ,anuncioController.getAllAnuncios);
router.get('/:id_ad', authMiddleware, anuncioController.getAnuncioById);
router.put('/:id_ad', authMiddleware, anuncioController.updateAnuncio);
router.delete('/:id_ad', authMiddleware, anuncioController.deleteAnuncio);

module.exports = router;
