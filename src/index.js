require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json({ limit: '1kb' }));      // evita payloads enormes

// Rutas
app.use('/api', require('./routes/check.route'));

// Manejador global de errores
app.use((err, _req, res, _next) => {
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.use(express.static('public'));

// Arranque
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API corriendo en puerto ${PORT}`));
