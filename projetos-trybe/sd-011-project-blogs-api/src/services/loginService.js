const { User } = require('../../models');
const { generateNewToken } = require('../auth/createJWT');
const { validateEmail, validatePassword } = require('./helpers');

const createLogin = async ({ email, password }) => {
  const invalidEmail = validateEmail(email);
  let responseMessage = { message: invalidEmail };

  if (invalidEmail) return { statusCode: 400, responseMessage };

  const invalidPassword = await validatePassword(password);
  responseMessage = { message: invalidPassword };

  if (invalidPassword) return { statusCode: 400, responseMessage };

  const access = await User.findOne({ where: { email, password } });

  if (!access) return { statusCode: 400, responseMessage: { message: 'Invalid fields' } };

  const token = await generateNewToken(email);

  return { statusCode: 200, responseMessage: { token } };
};

module.exports = {
  createLogin,
};