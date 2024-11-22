const express = require('express');
const etiquetasController = require('../controllers/etiquetasControler');

const router = express.Router();

// Ruta para insertar anuncios-etiquetas
router.post('/insertarAnunciosEtiquetas', etiquetasController.InsertarAnunciosEtiquetas);

// Ruta para obtener todas las etiquetas
router.get('/getAllEtiquetas', etiquetasController.getAllEtiquetas);

// Ruta para filtrar anuncios por etiquetas
router.post('/filterAnunciosByEtiquetas', etiquetasController.filterAnunciosByEtiquetas);

module.exports = router;