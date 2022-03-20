const { User, Categories } = require('../../models');

const invalidReqBodyResponse = (invalidReqBody) => ({
  statusCode: invalidReqBody.statusCode,
  responseMessage: { message: invalidReqBody.responseMessage },
});

const validateDisplayName = (displayName) => {
  const responseMessage = '"displayName" length must be at least 8 characters long';
  if (displayName.length < 8) return responseMessage;
  return null;
};

const validateEmail = (email) => {
  const emailRequired = '"email" is required';
  const emailMustBeValid = '"email" must be a valid email';
  const emptyEmailMessage = '"email" is not allowed to be empty';

  if (email === undefined) return emailRequired;

  if (email.length === 0) return emptyEmailMessage;

  const validEmail = /^[a-z][a-z\d_-]+\.?([a-z\d_-]+)?[^-]@[a-z-]{2,12}\.[a-z]{2,3}(\.[a-z]{2})?$/i;
  if (!validEmail.test(email)) return emailMustBeValid;
  
  return null;
};

const checkIfEmailAlreadyExists = async (email) => {
  const findUserByEmail = await User.findOne({ where: { email } });
  const code = 409;
  const message = 'User already registered';

  if (findUserByEmail) return { code, message };

  return null;
};

const validatePassword = (password) => {
  const passwordRequired = '"password" is required';
  const passwordMustBeValid = '"password" length must be 6 characters long';
  const emptyPasswordMessage = '"password" is not allowed to be empty';

  if (password === undefined) return passwordRequired;

  if (password.length === 0) return emptyPasswordMessage;

  if (password.length !== 6) return passwordMustBeValid;
};

const validateReqBody = async ({ displayName, email, password }) => {
  const statusCode = 400;

  const invalidPasswordMessage = validatePassword(password);
  if (invalidPasswordMessage) return { statusCode, responseMessage: invalidPasswordMessage };

  const invalidDisplayNameMessage = validateDisplayName(displayName);
  if (invalidDisplayNameMessage) return { statusCode, responseMessage: invalidDisplayNameMessage };

  const invalidEmailMessage = validateEmail(email);
  if (invalidEmailMessage) return { statusCode, responseMessage: invalidEmailMessage };

  const emailExists = await checkIfEmailAlreadyExists(email);
  if (emailExists) return { statusCode: emailExists.code, responseMessage: emailExists.message };
  
  return null;
};

const userNotFoundResponse = () => {
  const responseMessage = { message: 'User does not exist' };
  const statusCode = 404;
  return { statusCode, responseMessage };
};

const invalidBlogPostReqBody = ({ title, content, categoryIds }) => {
  const statusCode = 400;
  if (!title) return { statusCode, errorMessage: { message: '"title" is required' } };
  if (!content) return { statusCode, errorMessage: { message: '"content" is required' } };
  if (!categoryIds) return { statusCode, errorMessage: { message: '"categoryIds" is required' } };
  return false;
};

const validateCategoryArray = async (categoryIds) => {
  const findCategories = await Categories.findAll();
  const categories = findCategories.map((category) => category.id);
  
  let isValid = true;
  categoryIds.forEach((id) => {
    if (!categories.includes(id)) isValid = false;
  });

  if (!isValid) return { message: '"categoryIds" not found' };

  return false;
};

module.exports = {
  validateReqBody,
  invalidReqBodyResponse,
  validateEmail,
  validatePassword,
  userNotFoundResponse,
  invalidBlogPostReqBody,
  validateCategoryArray,
};