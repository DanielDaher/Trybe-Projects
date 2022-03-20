const models = require('../../database/models');

const getAllProducts = async (_req, res) => {
  const products = await models.products.findAll();

  if (!products) {
    return res.status(404).json({ message: 'Erro ao procurar produtos' });
  }

  res.status(200).json({ products });
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  const product = await models.products.findOne({ where: { id } });

  res.status(200).json(product);
};

module.exports = {
  getAllProducts,
  getProductById,
};