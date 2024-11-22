
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.cookies?.authToken; // Verifica si existe req.cookies

  // Si no hay token, permitimos acceso a rutas no protegidas
  if (!token) {
    req.user = null; // Opción para identificar usuarios no autenticados
    return next();
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(403).json({ error: 'Token inválido' });
    }

    req.userId = decoded.id;
    next();
  });
};

module.exports = authMiddleware;
