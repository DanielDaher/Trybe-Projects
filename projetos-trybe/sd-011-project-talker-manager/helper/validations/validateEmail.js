const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const validEmail = /^[A-Za-z0-9._]+@([A-Za-z]+\.)[A-Za-z]{2,3}(\.[A-Za-z]{2})?$/;

  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });

  if (!validEmail.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

module.exports = validateEmail;