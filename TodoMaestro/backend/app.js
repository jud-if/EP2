const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);

// Ruta protegida de ejemplo
app.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Acceso permitido' });
});

app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
