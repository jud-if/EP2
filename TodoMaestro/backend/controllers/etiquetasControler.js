const conexion = require('../database');

// TABLA anuncios-etiquetas
exports.InsertarAnunciosEtiquetas = (req, res) => {
    console.log("InsertarAnunciosEtiquetas");
    const relaciones = req.body; 
    const values = relaciones.map(({ id_ad, id_etiqueta }) => [id_ad, id_etiqueta]);
    console.log("VALUES", values);
    conexion.query(
      `INSERT INTO adsetiqueta (id_ad, id_etiqueta) VALUES ?`,
      [values],
      (error, results) => {
        if (error) {
          console.error('Error al insertar relaciones:', error);
          return res.status(500).json({ error: 'Error al insertar relaciones' });
        }
        res.json({ success: true });
      }
    );
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

// Filtrar anuncios por etiquetas
exports.filterAnunciosByEtiquetas = (req, res) => {
  const { etiquetas } = req.body; // Recibir las etiquetas seleccionadas en el cuerpo de la solicitud
  console.log(etiquetas);

  if (!etiquetas || etiquetas.length === 0) {
    return res.status(400).json({ error: 'No se proporcionaron etiquetas para filtrar' });
  }

  const placeholders = etiquetas.map(() => '?').join(',');
  const query = `
    SELECT DISTINCT a.* FROM anuncios a
    JOIN adsetiqueta ae ON a.id_ad = ae.id_ad
    JOIN etiquetas e ON ae.id_etiqueta = e.id_etiqueta
    WHERE e.id_etiqueta IN (${placeholders})
  `;

  conexion.query(query, [...etiquetas], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Error al filtrar anuncios' });
    }
    res.json(results);
    console.log(results);
  });
};