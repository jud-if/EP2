const conexion = require('../database');

// TABLA anuncios-etiquetas
exports.InsertarAnunciosEtiquetas = (req, res) => {
    console.log("InsertarAnunciosEtiquetas");
    const relaciones = req.body; 
    const values = relaciones.map(({ id_ad, id_etiqueta }) => [id_ad, id_etiqueta]);
    conexion.query(
      `INSERT INTO adsetiqueta (id_ad, id_etiqueta) VALUES ?`,
      [values]
    );
    res.json({ success: true });
};
  
// Obtener todas las etiquetas
exports.getAllEtiquetas = (req, res) => {
    console.log("getAllEtiquetas");
    const query = `SELECT * FROM etiquetas`;
    conexion.query(query, (error, results) => {
        if (error) {
        console.error("Error al obtener etiquetas:", error);
        return res.status(500).json({ error: 'Error al obtener etiquetas' });
        }
        res.json(results);
    });
};