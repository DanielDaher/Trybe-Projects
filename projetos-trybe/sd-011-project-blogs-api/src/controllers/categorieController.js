const categorieService = require('../services/categorieService');

const create = async (req, res) => {
  try {
    const { name } = req.body;
  
    const insert = await categorieService.create(name);
  
    return res.status(insert.statusCode).json(insert.responseMessage);
  } catch (error) {
    console.error(error);
  }
};

const getAllCategories = async (req, res) => {
  try {
    const findCategories = await categorieService.getAllCategories();

    return res.status(findCategories.statusCode).json(findCategories.responseMessage);
  } catch (error) {
    console.error(error);
  }
}; 

module.exports = {
  create,
  getAllCategories,
};