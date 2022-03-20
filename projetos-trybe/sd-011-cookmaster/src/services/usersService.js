const usersModel = require('../models/usersModel');
const { validReqBody, emailExists } = require('../helpers/helpers');

const getAll = async () => {
  const data = await usersModel.getAll();
  return data/* .map(keyToCamelCase) */;
};

const getById = async (id) => {
  const data = await usersModel.getById(id);
  const dataToArray = [data];
  return dataToArray/* .map(keyToCamelCase) */;
};

const create = async ({ email, password, name }) => {
  let responseMessage = { message: 'Invalid entries. Try again.' };
  let statusCode = 400;

  if (!email) return { statusCode, responseMessage };

  if (!validReqBody({ email, password, name })) return { statusCode, responseMessage };

  const emailExist = await emailExists(email);
  console.log(emailExist);

  if (emailExist) {
    return { statusCode: 409, responseMessage: { message: 'Email already registered' } };
  }

  const user = await usersModel.create({ email, password, name });

  responseMessage = { user };
  statusCode = 201;

  return { responseMessage, statusCode };
};

module.exports = {
  getAll,
  getById,
  create,
};