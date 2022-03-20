const userService = require('../services/userService');

const create = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
  
    const insert = await userService.create({ displayName, email, password, image });
  
    return res.status(insert.statusCode).json(insert.responseMessage);
  } catch (error) {
    console.error(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();

    return res.status(users.statusCode).json(users.responseMessage);
  } catch (error) {
    console.error(error);
  }
};

const getUserByID = async (req, res) => {
  try {
    const { id } = req.params;
    const findUser = await userService.getUserByID(id);

    return res.status(findUser.statusCode).json(findUser.responseMessage);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  create,
  getAllUsers,
  getUserByID,
};
