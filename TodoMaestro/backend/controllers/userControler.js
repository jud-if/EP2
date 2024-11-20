const conexion = require('../database');
const bcrypt = require('bcrypt');

exports.getUserProfile = (req, res) => {
  const userId = req.params.id;
  
  const query = 'SELECT nombres, apellido, email, tipo_perfil, fecha_creacion, region, comuna FROM usuarios WHERE id_usuario = ?';
  conexion.query(query, [userId], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Error al obtener datos del usuario' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(results[0]);
  });
};

exports.updateUserById = (req, res) => {
    const userId = req.params.id;
    const { usuario, apellido, email, tipoPerfil, region, comuna } = req.body;

    const query = 'UPDATE usuarios SET nombres = ?, apellido = ?, email = ?, tipo_perfil = ?, region = ?, comuna = ? WHERE id_usuario = ?';
    conexion.query(query, [usuario, apellido, email, tipoPerfil, region, comuna, userId], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error al actualizar el usuario' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json({ message: 'Usuario actualizado con éxito' });
    });
};

exports.deleteUserById = (req, res) => {
    const userId = req.params.id;

    const query = 'DELETE FROM usuarios WHERE id_usuario = ?';
    conexion.query(query, [userId], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error al eliminar el usuario' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json({ message: 'Usuario eliminado con éxito' });
    });
};