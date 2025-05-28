import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Ruta para login
router.post('/login', (req, res) => {
  const { usuario, password } = req.body;

  // Aquí deberías validar con base de datos
  if (usuario === 'admin' && password === '1234') {
    // Generar token
    const token = jwt.sign({ usuario }, 'mi_clave_secreta', { expiresIn: '1h' });

    res.json({ token });
  } else {
    res.status(401).json({ mensaje: 'Credenciales incorrectas' });
  }
});

export default router;
