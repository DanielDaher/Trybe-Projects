const SalesModels = require('../models/SalesModel');
const { errorMessage, quantityIsValid, validateSaleToRemove } = require('./helpers'); 

const create = async (sales) => {
  const invalid = 'Wrong product ID or invalid quantity';

  const validQuantity = quantityIsValid(sales).find((sale) => !sale); 

  if (validQuantity === false) return { responseMessage: errorMessage(invalid), statusCode: 422 };

  const insert = await SalesModels.create(sales);

  return { responseMessage: insert, statusCode: 200 };
};

const getAll = async () => {
  const data = await SalesModels.getAll();
  return { statusCode: 200, data };
};

const getById = async (id) => {
  const data = await SalesModels.getById(id);

  const invalidId = {
    err: {
      code: 'not_found',
      message: 'Sale not found',
    },
  };

  if (!data) return { statusCode: 404, data: invalidId };

  return { statusCode: 200, data };
};

const update = async (id, sale) => {
  const invalid = 'Wrong product ID or invalid quantity';

  const validQuantity = quantityIsValid(sale).find((valid) => !valid); 

  if (validQuantity === false) return { responseMessage: errorMessage(invalid), statusCode: 422 };

  const insert = await SalesModels.update(id, sale);

  return { responseMessage: insert, statusCode: 200 };
};

const remove = async (id) => {
  const idExists = await validateSaleToRemove(id);

  if (!idExists) {
    return { statusCode: 422, responseMessage: errorMessage('Wrong sale ID format') };
  }

  const data = {
    _id: idExists.id,
    name: idExists.name,
    quantity: idExists.quantity,
  };

  await SalesModels.remove({ id });

  return { responseMessage: data, statusCode: 200 };
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};