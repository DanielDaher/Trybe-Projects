const { User } = require('../../models');
const { generateNewToken } = require('../auth/createJWT');
const { validateReqBody, invalidReqBodyResponse, userNotFoundResponse } = require('./helpers');

const create = async ({ displayName, email, password, image }) => {
  const invalidReqBody = await validateReqBody({ displayName, email, password });

  if (invalidReqBody) return invalidReqBodyResponse(invalidReqBody);

  await User.create({ displayName, email, password, image });

  const token = await generateNewToken(email);

  return { responseMessage: { token }, statusCode: 201 };
};

const getAllUsers = async () => {
  const users = await User.findAll();
  const statusCode = 200;
  const responseMessage = users;

  return { statusCode, responseMessage };
};

const getUserByID = async (findID) => {
  const user = await User.findOne({ where: { id: findID } });
  
  if (!user) return userNotFoundResponse();

  const { id, displayName, email, image } = user;
  const userWithoutPassword = { id, displayName, email, image };

  return { statusCode: 200, responseMessage: userWithoutPassword };
};

module.exports = {
  create,
  getAllUsers,
  getUserByID,
};
