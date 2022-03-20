const usersModel = require('../models/usersModel');

const validEmail = (email) => {
  const validateEmail = /^[A-Za-z0-9._]+@([A-Za-z]+\.)[A-Za-z]{2,3}(\.[A-Za-z]{2})?$/;

  if (!validateEmail.test(email)) return null;
  
  return true;
};

const validReqBody = ({ email, password, name }) => {
  let valid = null;
  const emailIsValid = validEmail(email);

  if (!emailIsValid) return valid;
  if (!password) return valid;
  if (!name) return valid;

  valid = true;

  return valid;
};

const emailExists = async (email) => {
  const userEmail = await usersModel.getByEmail(email);
  console.log(userEmail);
  return userEmail; 
};

const validRecipesReqBody = ({ name, ingredients, preparation }) => {
  let valid = true;

  if (!name || !ingredients || !preparation) valid = null;

  return valid;
};

module.exports = {
  validReqBody,
  validRecipesReqBody,
  emailExists,
};