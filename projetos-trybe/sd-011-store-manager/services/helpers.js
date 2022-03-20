const ProductsModels = require('../models/ProductsModel');
const SalesModels = require('../models/SalesModel');

const errorMessage = (data) => ({
  err: {
    code: 'invalid_data',
    message: data,
  },
});

const validateName = async ({ name }) => {
  let message = null;

  const product = await ProductsModels.getByName({ name });

  if (typeof name !== 'string') message = 'name must be a string';

  if (name.length <= 5) message = '"name" length must be at least 5 characters long';

  if (product.length > 0) message = 'Product already exists';

  return message;
};

const validateQuantity = ({ quantity }) => {
  let message = null;

  if (quantity <= 0) {
    message = '"quantity" must be larger than or equal to 1';
  }

  if (typeof quantity !== 'number') message = '"quantity" must be a number';

  return message; 
};

const validateNameToUpdate = async ({ name }) => {
  let message = null;

  if (typeof name !== 'string') message = 'name must be a string';

  if (name.length <= 5) message = '"name" length must be at least 5 characters long';

  return message;
};

const validateProductToRemove = async ({ id }) => {
  let message = true;

  const checkIfExist = await ProductsModels.getById(id);

  if (!checkIfExist) message = null;

  return message;
};

const validateSaleToRemove = async (id) => {
  let message = true;

  const checkIfExist = await SalesModels.getById(id);

  if (!checkIfExist) message = null;

  return message;
};

const quantityIsValid = (sales) => sales.map((sale) => {
  if (sale.quantity <= 0) return false;
  if (typeof sale.quantity !== 'number') return false;
  return true;
});

module.exports = {
  validateName,
  validateQuantity,
  errorMessage,
  validateNameToUpdate,
  validateProductToRemove,
  quantityIsValid,
  validateSaleToRemove,
};