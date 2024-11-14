// database.js
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const conexion = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

conexion.connect((error) => {
  if (error) {
    console.error('No se pudo conectar a la base de datos:', error);
    return;
  }
  console.log('Conexión con la base de datos establecida');
});

module.exports = conexion;
