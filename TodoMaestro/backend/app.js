const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
const userRoutes = require('./routes/userRoutes');
const anunciosRoutes = require('./routes/anunciosRoutes');
const etiquetasRoute = require('./routes/etiquetasRoute');
const cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const port = 3000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Límite de 100 solicitudes por IP
  message: "Demasiadas solicitudes desde esta IP, intente más tarde.",
});

const corsOptions = {
  origin: 'http://localhost:8100',  // Origen de tu aplicación frontend
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true, // Si estás usando cookies o autenticación con credenciales
};

app.use(cors(corsOptions));
app.use(limiter);
app.use(helmet());
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
app.use('/api', authMiddleware);
app.use('/api', anunciosRoutes);
app.use('/api', userRoutes);
app.use('/api', etiquetasRoute);

function printRoutes(stack, prefix = '') {
  stack.forEach(function(r) {
      if (r.route && r.route.path) {
          Object.keys(r.route.methods).forEach(method => {
              console.log(`${method.toUpperCase()} ${prefix}${r.route.path}`);
          });
      } else if (r.name === 'router') {
          // Esta parte imprime las subrutas
          r.handle.stack.forEach(function(sr) {
              if (sr.route) {
                  Object.keys(sr.route.methods).forEach(method => {
                      console.log(`${method.toUpperCase()} ${prefix}${sr.route.path}`);
                  });
              }
          });
      }
  });
}

app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);

  console.log('\nRutas registradas:');
  console.log('\nRutas registradas:');
    printRoutes(app._router.stack);
});
