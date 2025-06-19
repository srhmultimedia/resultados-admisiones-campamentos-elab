module.exports = (req, res, next) => {
  const { documento } = req.body;
  if (!documento) return res.status(400).json({ error: 'Documento requerido' });
  if (!/^\d{6,15}$/.test(documento))
    return res.status(422).json({ error: 'Formato de documento inválido' });
  next();
};
