const recipesServices = require('../services/recipesServices');

const getAll = async (req, res) => {
  try {
    const recipes = await recipesServices.getAll();

    res.status(200).json(recipes);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: 'Not Found!' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await recipesServices.getById(id);

    res.status(recipe.statusCode).json(recipe.responseMessage);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: 'error' });
  }
};

const updateRecipeById = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { id } = req.params;
    const { _id: userId } = req.user;

    const updateInfo = { id, userId, name, ingredients, preparation };

    const updateRecipe = await recipesServices.updateRecipeById(updateInfo);
    
    return res.status(updateRecipe.statusCode).json(updateRecipe.responseMessage);
  } catch (error) {
    console.error(error);

    res.status(404).json({ message: 'error' });
  }
};

const uploadRecipeImage = async (req, res) => {
  try {
    const { path } = req.file;
    const { id } = req.params;
    /* console.log(req.body, req.file); */

    const uploadImage = await recipesServices.uploadRecipeImage({ id, path });

    return res.status(uploadImage.statusCode).json(uploadImage.responseMessage);    
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: 'error' });
  }
};

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  
  const insertRecipe = await recipesServices.create({ name, ingredients, preparation, userId });

  return res.status(insertRecipe.statusCode).json(insertRecipe.responseMessage);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  
  const excludedRecipe = await recipesServices.deleteRecipe(id);

  if (excludedRecipe.statusCode === 404) {
    return res.status(excludedRecipe.statusCode).json(excludedRecipe.responseMessage);
  } 

  return res.status(excludedRecipe.statusCode).json();
};

module.exports = {
  getAll,
  getById,
  updateRecipeById,
  uploadRecipeImage,
  create,
  deleteRecipe,
};