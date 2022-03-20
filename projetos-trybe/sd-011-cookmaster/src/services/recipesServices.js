const recipesModel = require('../models/recipesModel');
const { validRecipesReqBody } = require('../helpers/helpers');

const getAll = async () => {
  const data = await recipesModel.getAll();
  return data;
};

const getById = async (id) => {
  let responseMessage = { message: 'recipe not found' };
  let statusCode = 404;
  const data = await recipesModel.getById(id);

  if (data) {
    responseMessage = data;
    statusCode = 200;
  } 

  return { responseMessage, statusCode };
};

const updateRecipeById = async ({ id, userId, name, ingredients, preparation }) => {
  const responseMessage = { message: 'recipe not found' };
  const statusCode = 404;

  const updateRecipe = await recipesModel
    .updateRecipeById({ id, userId, name, ingredients, preparation });
  
  if (!updateRecipe) return { statusCode, responseMessage };

  return { statusCode: 200, responseMessage: updateRecipe };
};

const uploadRecipeImage = async ({ id, path }) => {
  const recipe = await recipesModel.getById(id);
  if (!recipe) return { statusCode: 404, responseMessage: 'recipe not found' };

  const filePath = `localhost:3000/${path}`;
  await recipesModel.uploadRecipeImage({ id, filePath });
  
  const responseMessage = {
    ...recipe,
    image: filePath,
  };

  return { statusCode: 200, responseMessage };
};

const create = async ({ name, ingredients, preparation, userId }) => {
  let responseMessage = { message: 'Invalid entries. Try again.' };
  let statusCode = 400;

  if (!name) return { statusCode, responseMessage };

  if (!validRecipesReqBody({ name, ingredients, preparation })) {
    return { statusCode, responseMessage };
  } 

  const recipe = await recipesModel.create({ name, ingredients, preparation, userId });

  responseMessage = { recipe };
  statusCode = 201;

  return { responseMessage, statusCode };
};

const deleteRecipe = async (id) => {
  const recipe = await recipesModel.getById(id);
  if (!recipe) return { statusCode: 404, responseMessage: 'recipe not found' };

  const excludeRecipe = await recipesModel.deleteRecipe(id);

  return { statusCode: excludeRecipe.statusCode };
};

module.exports = {
  getAll,
  getById,
  updateRecipeById,
  uploadRecipeImage,
  create,
  deleteRecipe,
};