const { resolve } = require('path');
const recipesServices = require('../services/recipesServices');

const getImageByRecipeId = async (req, res) => {
  try {
    const { imageName } = req.params;
    const id = imageName.split('.')[0];
    const recipe = await recipesServices.getById(id);
    if (!recipe) return res.status(404).json({ message: 'recipe not found' });

    res.status(200).sendFile(resolve(__dirname, '..', 'uploads', imageName));
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: 'error' });
  }
};

module.exports = {
  getImageByRecipeId,
};