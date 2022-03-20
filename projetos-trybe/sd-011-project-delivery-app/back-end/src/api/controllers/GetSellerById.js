const models = require('../../database/models');

const getSellerById = async (req, res) => {
  const { id } = req.params;

  const seller = await models.users.findOne({ where: { id } });

  res.status(200).json({ seller });
};

module.exports = getSellerById;
