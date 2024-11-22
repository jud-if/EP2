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
    const { idUsuario } = req.params; // Obtenemos el ID del usuario desde los parámetros de la ruta
    
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

// Obtener un anuncio por su titulo
exports.getAnuncioByTitulo = (req, res) => {
  const { titulo } = req.params; // Obtenemos el título desde los parámetros de la ruta

  const query = 'SELECT * FROM anuncios WHERE titulo LIKE ? OR descripcion LIKE ?';

  conexion.query(query, [`%${titulo}%`, `%${titulo}%`], (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      return res.status(500).json({ error: 'Error al obtener el anuncio' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'No se encontró un anuncio con ese título' });
    }

    res.status(200).json(results[0]);
  });
};

  
// Crear un nuevo anuncio
exports.createAnuncio = (req, res) => {
  const { tipo_anuncio, titulo, descripcion, region, comuna, salario, id_usuario, fecha_creacion } = req.body;

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
  const { id_ad } = req.params;
  const { titulo, descripcion, region, comuna, salario } = req.body;
  console.log('update')

  const query = `
    UPDATE anuncios 
    SET titulo = ?, descripcion = ?, region = ?, comuna = ?, salario = ?
    WHERE id_ad = ?`;

  console.log("Editar anuncio ", id_ad,"Data:", req.body )
  conexion.query(query, [titulo, descripcion, region, comuna, salario, id_ad], (error) => {
    if (error) {
      return res.status(500).json({ error: 'Error al actualizar anuncio' });
    }
    res.json({ message: 'Anuncio actualizado con éxito' });
  });
};
// Eliminar un anuncio
exports.deleteAnuncio = (req, res) => {
  const { id_ad } = req.params;  // Usamos el nombre correcto del parámetro
  console.log('ID recibido para eliminar:', id_ad);  // V
  const query = 'DELETE FROM anuncios WHERE id_ad = ?';

  conexion.query(query, [id_ad], (error, result) => {
    if (error) {
      console.error('Error al eliminar anuncio:', error);
      return res.status(500).json({ error: 'Error al eliminar el anuncio' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'El anuncio no existe o ya fue eliminado' });
    }

    res.json({ message: 'Anuncio eliminado con' });
  });
};


// Obtener id anuncio recien publicado
exports.AnuncioRecienCreado = (req, res) => {
  console.log("AnuncioRecienCreado");
  const { id_usuario, fecha_creacion } = req.query; // Usar req.query para los parámetros de consulta
  const fechaFormateada = fecha_creacion.split('T')[0];
  console.log(id_usuario, fechaFormateada);
  const query = `
  SELECT id_ad FROM anuncios 
  ORDER BY id_ad DESC
  LIMIT 1`;
  conexion.query(query, [id_usuario, fechaFormateada], (error, results) => {
    if (error) {
      console.error('Error al obtener el ID del anuncio:', error);
      return res.status(500).json({ error: 'Error al obtener el ID del anuncio' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'No se encontró un anuncio con esos datos' });
    }

    console.log(results);
    res.json({ id: results[0].id_ad });
  });
};