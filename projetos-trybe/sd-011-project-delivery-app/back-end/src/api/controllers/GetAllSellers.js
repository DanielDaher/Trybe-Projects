const models = require('../../database/models');

const getAllSellers = async (_req, res) => {
  const sellers = await models.users.findAll({ where: { role: 'seller' } });

  res.status(200).json({ sellers });
};

module.exports = getAllSellers;
