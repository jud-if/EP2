const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
const anunciosRoutes = require('./routes/anunciosRoutes');
const cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const port = 3000;

const corsOptions = {
  origin: 'http://localhost:8100',  // Origen de tu aplicación frontend
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true, // Si estás usando cookies o autenticación con credenciales
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

// Autenticación pública para verificar estado de sesión
app.get('/auth/status', (req, res) => {
  const token = req.cookies?.authToken;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).json({ isAuthenticated: false });
      }
      return res.json({ isAuthenticated: true, userId: decoded.id });
    });
  } else {
    res.status(401).json({ isAuthenticated: false });
  }
});

app.use('/auth', authRoutes);

// Rutas protegidas
app.use('/anuncios', authMiddleware, anunciosRoutes);


app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
