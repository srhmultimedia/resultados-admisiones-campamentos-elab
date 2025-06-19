const pool = require('../config/db');

exports.checkAdmission = async (req, res, next) => {
  try {
    const { documento } = req.body;
    const [rows] = await pool.execute(
      'SELECT nombre, admitido FROM students WHERE documento = ? LIMIT 1',
      [documento]
    );

    if (!rows.length)
      return res.json({ status: 'not_found', message: 'Documento no registrado' });

    const { nombre, admitido } = rows[0];
    if (admitido === 'SI')
      return res.json({
        status: 'admitido',
        message: `🎉 Felicitaciones ${nombre}, has sido admitido`,
        nombre,
      });

    return res.json({
      status: 'revision',
      message: 'Tu prueba está en revisión. Vuelve a consultar más tarde.',
      nombre,
    });
  } catch (err) {
    console.error(err);
    next(err); // llegará al manejador global de errores
  }
};
