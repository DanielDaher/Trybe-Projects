const usersService = require('../services/usersService');

const getAll = async (req, res) => {
  try {
    const users = await usersService.getAll();

    res.status(200).json({ message: users });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: 'Not Found!' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersService.getById(id);

    res.status(200).json({ message: user });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: 'Not Found!' });
  }
};

const create = async (req, res) => {
    const { email, password, name } = req.body;

    const insert = await usersService.create({ email, password, name });

    res.status(insert.statusCode).json(insert.responseMessage);
};

module.exports = {
  getAll,
  getById,
  create,
};