const validateNewUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const minNameLength = 12;
  const minPasswordLength = 6;
  const regex = /[a-z0-9]+@[a-z]+\.[a-z]{3}/;

  if (name.length < minNameLength) return res.status(400).json({ message: 'Invalid name' });
  if (!regex.test(email)) return res.status(400).json({ message: 'Invalid email' });
  if (password.length < minPasswordLength) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  return next();
};

module.exports = validateNewUser;