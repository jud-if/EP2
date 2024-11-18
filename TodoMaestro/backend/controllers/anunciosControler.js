const conexion = require('../database');

// Obtener todos los anuncios
exports.getAllAnuncios = (req, res) => {
  const query = 'SELECT * FROM anuncios';
  conexion.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Error al obtener anuncios' });
    }
    res.json(results);
  });
};
  exports.getAnunciosByIdUsuario = (req, res) => {
    const { idUsuario } = req.params; // Obtener el ID del usuario desde los parámetros de la ruta
    
    const query = 'SELECT * FROM anuncios WHERE id_usuario = ?';
    
    conexion.query(query, [idUsuario], (error, results) => {
        if (error) {
            console.error('Error al ejecutar la consulta:', error);
            return res.status(500).json({ 
                error: 'Error al obtener los anuncios del usuario' 
            });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ 
                message: 'No se encontraron anuncios para este usuario' 
            });
        }
        
        res.status(200).json(results);
    });
};

// Obtener un anuncio por su ID

  
// Crear un nuevo anuncio
exports.createAnuncio = (req, res) => {
  const { tipo_anuncio, titulo, descripcion, region, comuna, salario, id_usuario } = req.body;
  const fecha_creacion = new Date();

  const query = `
    INSERT INTO anuncios (tipo_anuncio, titulo, descripcion, region, comuna, salario, fecha_creacion, id_usuario) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    console.log(tipo_anuncio, titulo, descripcion, region, comuna, salario, id_usuario);
    console.log(query);
  conexion.query(query, [tipo_anuncio, titulo, descripcion, region, comuna, salario, fecha_creacion, id_usuario], (error) => {
    if (error) {
      return res.status(500).json({ error: 'Error al crear anuncio' });
    }
    res.status(201).json({ message: 'Anuncio creado con éxito' });
  });
};

// Actualizar un anuncio
exports.updateAnuncio = (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, region, comuna, salario } = req.body;

  const query = `
    UPDATE anuncios 
    SET titulo = ?, descripcion = ?, region = ?, comuna = ?, salario = ?
    WHERE id_ad = ?`;

  conexion.query(query, [titulo, descripcion, region, comuna, salario, id], (error) => {
    if (error) {
      return res.status(500).json({ error: 'Error al actualizar anuncio' });
    }
    res.json({ message: 'Anuncio actualizado con éxito' });
  });
};

// Eliminar un anuncio
exports.deleteAnuncio = (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM anuncios WHERE id_ad = ?';

  conexion.query(query, [id], (error) => {
    if (error) {
      return res.status(500).json({ error: 'Error al eliminar anuncio' });
    }
    res.json({ message: 'Anuncio eliminado con éxito' });
  });
};
