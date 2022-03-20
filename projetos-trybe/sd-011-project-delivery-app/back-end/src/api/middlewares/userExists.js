const models = require('../../database/models');

const userExists = async (req, res, next) => {
  const { name, email } = req.body;

  const findByName = await models.users.findOne({ where: { name } });
  const findByEmail = await models.users.findOne({ where: { email } });

  if (findByName) return res.status(409).json({ message: 'User name exists' });
  if (findByEmail) return res.status(409).json({ message: 'User email exists' });

  return next();
};

module.exports = userExists;