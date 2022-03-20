const { Categories } = require('../../models');

const create = async (name) => {
  const nameErrorMessage = { message: '"name" is required' };

  if (name === undefined) return { statusCode: 400, responseMessage: nameErrorMessage };

  await Categories.create({ name });
  const findCategory = await Categories.findOne({ where: { name } });

  return { responseMessage: findCategory, statusCode: 201 };
};

const getAllCategories = async () => {
  const findCategories = await Categories.findAll();

  return { statusCode: 200, responseMessage: findCategories };
};

module.exports = {
  create,
  getAllCategories,
};