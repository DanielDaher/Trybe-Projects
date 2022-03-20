const SalesService = require('../services/SalesService');

const create = async (req, res) => {
  const sales = req.body;

  const insert = await SalesService.create(sales);

  res.status(insert.statusCode).json(insert.responseMessage);
};

const getAll = async (req, res) => {
  try {
    const sales = await SalesService.getAll();

    res.status(sales.statusCode).json({ sales: sales.data });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: 'Aconteceu erro ao buscar os dados' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const sale = await SalesService.getById(id);

    res.status(sale.statusCode).json(sale.data);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: 'Aconteceu erro ao buscar os dados' });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = req.body;

  const insert = await SalesService.update(id, sale);

  res.status(insert.statusCode).json(insert.responseMessage);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Aconteceu erro ao buscar os dados' });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    
    const exclude = await SalesService.remove(id);
    
    res.status(exclude.statusCode).json(exclude.responseMessage);
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