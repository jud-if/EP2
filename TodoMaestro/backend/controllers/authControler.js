// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const conexion = require('../database');
const dotenv = require('dotenv');

dotenv.config();

exports.register = async (req, res) => {

  console.log("aqui llegamos antes de la consulta");
  const { usuario, apellido, email, password, tipoPerfil,region, comuna } = req.body;
  const fecha_creacion = new Date();
  const hashedPassword = await bcrypt.hash(password, 10);

  console.log(req.body);
  console.log(hashedPassword);
  console.log(fecha_creacion);

  const query = 'INSERT INTO usuarios (nombres, apellido, email, tipo_perfil, password, fecha_creacion,region,comuna) VALUES (?, ?, ?, ?, ?,?,?,?)';
  conexion.query(query, [usuario, apellido, email, tipoPerfil ,hashedPassword, fecha_creacion,region,comuna], (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al registrar el usuario' });
    }
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM usuarios WHERE email = ?';
  conexion.query(query, [email], async (error, results) => {
    if (error || results.length === 0) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: user.id_usuario }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Inicio de sesión exitoso', token });
  });
};
