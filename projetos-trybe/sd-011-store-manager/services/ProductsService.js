const ProductsModels = require('../models/ProductsModel');
const {
  validateName,
  validateQuantity,
  errorMessage,
  validateNameToUpdate,
  validateProductToRemove } = require('./helpers');

const create = async ({ name, quantity }) => {
  const problemsOnReqBodyName = await validateName({ name });
  const problemsOnReqBodyQuantity = validateQuantity({ quantity });

  if (problemsOnReqBodyName) {
    return { statusCode: 422, responseMessage: errorMessage(problemsOnReqBodyName) };
  }

  if (problemsOnReqBodyQuantity) {
    return { statusCode: 422, responseMessage: errorMessage(problemsOnReqBodyQuantity) };
  }

  const insert = await ProductsModels.create({ name, quantity });

  return { responseMessage: insert, statusCode: 201 };
};

const getAll = async () => {
  const data = await ProductsModels.getAll();
  return data;
};

const getById = async (id) => {
  const data = await ProductsModels.getById(id);

  if (!data) return { statusCode: 422, responseMessage: errorMessage('Wrong id format') };

  return { statusCode: 200, responseMessage: data };
};

const update = async ({ name, quantity, id }) => {
  const problemsOnReqBodyName = await validateNameToUpdate({ name });
  const problemsOnReqBodyQuantity = validateQuantity({ quantity });

  if (problemsOnReqBodyName) {
    return { statusCode: 422, responseMessage: errorMessage(problemsOnReqBodyName) };
  }

  if (problemsOnReqBodyQuantity) {
    return { statusCode: 422, responseMessage: errorMessage(problemsOnReqBodyQuantity) };
  }

  const insert = await ProductsModels.update({ name, quantity, id });

  return { responseMessage: insert, statusCode: 200 };
};

const remove = async ({ id }) => {
  const idExists = await validateProductToRemove({ id });

  if (!idExists) {
    return { statusCode: 422, responseMessage: errorMessage('Wrong id format') };
  }

  const data = {
    _id: idExists.id,
    name: idExists.name,
    quantity: idExists.quantity,
  };

  await ProductsModels.remove({ id });

  return { responseMessage: data, statusCode: 200 };
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};