const ProductsService = require('../services/ProductsService');

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const insert = await ProductsService.create({ name, quantity });

  res.status(insert.statusCode).json(insert.responseMessage);
};

const getAll = async (req, res) => {
  try {
    const products = await ProductsService.getAll();

    res.status(200).json({ products });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: 'Aconteceu erro ao buscar os dados' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductsService.getById(id);

    res.status(product.statusCode).json(product.responseMessage);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: 'Aconteceu erro ao buscar os dados' });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;

  const insert = await ProductsService.update({ name, quantity, id });

  res.status(insert.statusCode).json(insert.responseMessage);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Aconteceu erro ao buscar os dados' });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteItem = await ProductsService.remove({ id });

    res.status(deleteItem.statusCode).json(deleteItem.responseMessage);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Aconteceu erro ao buscar os dados' });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};