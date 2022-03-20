const loginService = require('../services/loginService');

const createLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
  
    const insert = await loginService.createLogin({ email, password });
  
    return res.status(insert.statusCode).json(insert.responseMessage);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createLogin,
};